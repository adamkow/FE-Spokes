import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function UserView() {
  // fetch user?
  const { user } = useLocalSearchParams()

  return (
    <View className="flex-1 m-5 justify-start items-center">
      <Text>User id: {user}</Text>
    </View>
  )
}
