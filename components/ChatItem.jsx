import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { useAuth } from '@/contexts/authContext'
import { blurhash, getNotLoggedInUserData } from '@/utilis/common'
import { db } from '@/firebaseConfig'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'

export default function ChatItem({ item }) {
  const [userToDisplay, setUserToDisplay] = useState()
  const { user } = useAuth()
  const [lastMessage, setLastMessage] = useState(undefined)

  useEffect(() => {
    const currentUser = getNotLoggedInUserData(item, user.user_id)
    setUserToDisplay(currentUser)
    const docRef = doc(db, 'rooms', item.chatRoomId)
    const messagesRef = collection(docRef, 'messages')
    const q = query(messagesRef, orderBy('createdAt', 'desc'))

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => doc.data())
      setLastMessage(allMessages[0] ? allMessages[0] : null)
    })

    return unsub
  }, [])

  const displayLastMesssage = () => {
    if (typeof lastMessage === 'undefined') return 'Loading...'
    if (lastMessage) {
      if (user.user_id === lastMessage?.userId) {
        return 'You: ' + lastMessage?.text
      } else {
        return lastMessage?.text
      }
    } else {
      return 'Say hello'
    }
  }

  const displayTime = () => {
    if (lastMessage) {
      const date = lastMessage.createdAt.toDate()
      const formattedDate = date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
      })
      return formattedDate
    }
  }

  return (
    <Link
      href={{
        pathname: 'messages',
        params: { chat_room: item.chatRoomId },
      }}
      className="border-b bg-gray-200 border-neutral-200 mx-3 my-1 p-2 rounded-md"
    >
      <View className="flex-row">
        <Image
          style={styles.image}
          source={{ uri: userToDisplay?.avatar_url }}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
        <View className="ml-4">
          <View className="flex-col gap-2">
            <Text className="font-semibold text-md text-neutral-700">
              {userToDisplay?.username}
            </Text>
            <Text className="font-medium text-xs text-neutral-500">
              {displayTime()}
            </Text>

            <Text className="font-medium text-xs text-neutral-500">
              {displayLastMesssage()}
            </Text>
          </View>
        </View>
      </View>
    </Link>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 70,
    height: 70,
    backgroundColor: '#0553',
    borderRadius: 50,
  },
})
