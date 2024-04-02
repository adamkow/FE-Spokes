import { View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import ChatRoom from '@/components/ChatRoom'
import { LoggedUserInfoForDevContext } from '@/contexts/LoggedUserInfoForDevContext'
import { fetchChatRoomsForUser } from '@/utilis/common'
import ChatList from '@/components/ChatList'
import Loading from '@/components/Loading'

export default function Messages() {
  const chatRoomId = useLocalSearchParams().chat_room
  const { loggedInUserInfo } = useContext(LoggedUserInfoForDevContext)
  const [loading, setLoading] = useState(false)

  const [chatRooms, setChatRooms] = useState([])

  useEffect(() => {
    setLoading(true)
    fetchChatRoomsForUser(loggedInUserInfo.user_id).then((chatRooms) => {
      setChatRooms(chatRooms)
      setLoading(false)
    })
  }, [])

  if (chatRoomId) {
    return <ChatRoom />
  }

  return (
    <View className="flex-1 mt-20">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Loading />
        </View>
      ) : (
        <ChatList chatRooms={chatRooms} />
      )}
    </View>
  )
}
