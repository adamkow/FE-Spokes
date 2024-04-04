import { View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import ChatRoom from '@/components/ChatRoom'
import { useAuth } from '@/contexts/authContext'
import { fetchChatRoomsForUser } from '@/utilis/common'
import ChatList from '@/components/ChatList'
import Loading from '@/components/Loading'
import { StatusBar } from 'expo-status-bar'

export default function Messages() {
  const chatRoomId = useLocalSearchParams().chat_room
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const [chatRooms, setChatRooms] = useState([])

  useEffect(() => {
    setLoading(true)
    fetchChatRoomsForUser(user.user_id).then((chatRooms) => {
      setChatRooms(chatRooms)
      setLoading(false)
    })
  }, [])

  if (chatRoomId) {
    return <ChatRoom />
  }

  return (
    <View className="flex-1 pt-20  bg-slate-900">
      <StatusBar style="light" />
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
