import { View, Text, Pressable, TextInput, Alert } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useAuth } from '@/contexts/authContext'
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import MessageList from './MessageList'
import ChatRoomHeader from './ChatRoomHeader'
import { getChatRoomById, getNotLoggedInUserData } from '@/utilis/common'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function ChatRoom() {
  const chatRoomId = useLocalSearchParams().chat_room
  const { user: loggedInUserInfo } = useAuth()
  const [messages, setMessages] = useState([])
  const [userToDisplay, setUserToDisplay] = useState()
  const [room, setRoom] = useState()
  const textRef = useRef()
  const inputRef = useRef()

  useEffect(() => {
    const docRef = doc(db, 'rooms', chatRoomId)
    getChatRoomById(chatRoomId).then((roomData) => {
      setRoom(roomData)
      const user = getNotLoggedInUserData(roomData, loggedInUserInfo.user_id)
      setUserToDisplay(user)
    })

    const messagesRef = collection(docRef, 'messages')
    const q = query(messagesRef, orderBy('createdAt', 'asc'))

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data()
      })
      setMessages([...allMessages])
    })

    return unsub
  }, [])

  const handleSendMessage = async () => {
    let message = textRef.current.trim()
    if (!message) return
    try {
      const docRef = doc(db, 'rooms', chatRoomId)
      const messagesRef = collection(docRef, 'messages')
      textRef.current = ''
      if (inputRef) inputRef?.current?.clear()

      const newDoc = await addDoc(messagesRef, {
        userId: loggedInUserInfo.user_id,
        text: message,
        senderName: loggedInUserInfo.username,
        avatar_url: loggedInUserInfo.avatar_url,
        createdAt: Timestamp.fromDate(new Date()),
      })
    } catch (err) {
      Alert.alert('Message', err.message)
    }
  }

  return (
    <View className="flex-1">
      <ChatRoomHeader user={userToDisplay} />
      <View className=" border-b border-neutral-300" />
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessageList messages={messages} />
        </View>
      </View>
      <View className="mb-2 pt-2">
        <View className="flex-row justify-between items-center mx-3">
          <View className=" flex-1 flex-row justify-between p-2 bg-white border rounded-md">
            <TextInput
              ref={inputRef}
              placeholder="type message..."
              className="flex-1 mr-2 p-1"
              onChangeText={(value) => (textRef.current = value)}
            />
            <Pressable
              onPress={handleSendMessage}
              className="bg-neutral-200 p-3 rounded-md"
              aria-label="send"
            >
              <FontAwesome size={15} name="send" color={'black'} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}
