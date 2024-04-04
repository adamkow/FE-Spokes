import { Text, View } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'

export default function ChatList({ chatRooms }) {
  if (chatRooms?.length > 0) {
    return (
      <View className="flex-1 justify-start">
        {chatRooms.map((chatRoom) => {
          return <ChatItem item={chatRoom} key={chatRoom.chatRoomId} />
        })}
      </View>
    )
  } else {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white">There are no messages yet</Text>
      </View>
    )
  }
}
