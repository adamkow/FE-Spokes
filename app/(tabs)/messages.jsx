import { View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import ChatRoom from '@/components/ChatRoom'
import { LoggedUserInfoForDevContext } from '@/contexts/LoggedUserInfoForDevContext'
import { fetchChatRoomsForUser } from '@/utilis/common'
import ChatList from '@/components/ChatList'

export default function Messages() {
  const chatRoomId = useLocalSearchParams().chat_room
  const { loggedInUserInfo } = useContext(LoggedUserInfoForDevContext)

  const [chatRooms, setChatRooms] = useState([])

  useEffect(() => {
    fetchChatRoomsForUser(loggedInUserInfo.user_id).then((chatRooms) => {
      setChatRooms(chatRooms)
    })
  }, [])

  if (chatRoomId) {
    return <ChatRoom />
  }

  return (
    <View className="flex-1 ">
      {chatRooms.length > 0 && (
        <View>
          <ChatList chatRooms={chatRooms} />
        </View>
      )}
    </View>
  )
}
