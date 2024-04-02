import { FlatList, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ChatItem from './ChatItem'

export default function ChatList({ chatRooms }) {
  return (
    <View className="flex-1">
      <FlatList
        data={chatRooms}
        contentContainersStyle={{ flex: 1, paddingVerical: 25 }}
        keyExtractor={(item) => item.chatRoomId}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ChatItem item={item} />}
      />
    </View>
  )
}
