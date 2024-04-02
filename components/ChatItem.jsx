import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { LoggedUserInfoForDevContext } from '@/contexts/LoggedUserInfoForDevContext'
import { blurhash, getNotLoggedInUserData } from '@/utilis/common'
import { db } from '@/firebaseConfig'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'

export default function ChatItem({ item }) {
  const [userToDisplay, setUserToDisplay] = useState()
  const { loggedInUserInfo } = useContext(LoggedUserInfoForDevContext)
  const [lastMessage, setLastMessage] = useState(undefined)
  useEffect(() => {
    const user = getNotLoggedInUserData(item, loggedInUserInfo.user_id)
    setUserToDisplay(user)
    const docRef = doc(db, 'rooms', item.chatRoomId)
    const messagesRef = collection(docRef, 'messages')
    const q = query(messagesRef, orderBy('createdAt', 'desc'))

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => doc.data())
      setLastMessage(allMessages[0] ? allMessages[0] : null)
    })

    return unsub
  }, [item])

  const displayLastMesssage = () => {
    if (typeof lastMessage === 'undefined') return 'Loading...'
    if (lastMessage) {
      if (loggedInUserInfo.user_id === lastMessage?.userId) {
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
      className="flex justify-between items-center m-2 border-b border-neutral-200 "
    >
      <View className="flex-1 flex-row gap-4 p-2 items-center bg-slate-50">
        <View>
          <Image
            style={styles.image}
            source={{ uri: userToDisplay?.avatar_url }}
            placeholder={blurhash}
            contentFit="cover"
            transition={1000}
          />
        </View>
        <View className="flex-1 gap-1">
          <View className="flex-row justify-between ">
            <Text className="font-semibold text-md text-neutral-700">
              {userToDisplay?.username}
            </Text>
            <Text className="font-medium text-xs text-neutral-500">
              {displayTime()}
            </Text>
          </View>
          <Text className="font-medium text-xs text-neutral-500">
            {displayLastMesssage()}
          </Text>
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
    borderRadius: '50%',
  },
})
