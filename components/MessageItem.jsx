import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { useAuth } from '@/contexts/authContext'

export default function MessageItem({ message }) {
  const { user } = useAuth()

  if (user.user_id === message.userId) {
    return (
      <View className="flex-row justify-end mr-3">
        <View className="flex p-3 m-1 rounded-md bg-white border border-neutral-100 ">
          <Text>{message.text}</Text>
        </View>
      </View>
    )
  } else {
    return (
      <View className="flex-row justify-start ml-3">
        <View className="flex p-3 m-1 rounded-md bg-indigo-100 border border-indigo-100 ">
          <Text>{message.text}</Text>
        </View>
      </View>
    )
  }
}
