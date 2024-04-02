import { ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

export default function MessageList({ messages }) {
  return (
    <ScrollView showsVerticalScrollIndicator className="flex-1">
      {messages.map((message) => {
        return (
          <MessageItem
            key={`${message.createdAt}${message.senderName}`}
            message={message}
          />
        )
      })}
    </ScrollView>
  )
}
