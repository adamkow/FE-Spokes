import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Stack, Tabs, router } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { blurhash } from '@/utilis/common'

export default function ChatRoomHeader({ user }) {
  return (
    <View className="flex-row items-center gap-4 p-3 bg-slate-50">
      <Pressable onPress={() => router.replace('messages')}>
        <FontAwesome size={15} name="chevron-left" color={'black'} />
      </Pressable>
      <View className="flex-row items-center gap-4 m-3">
        <Image
          style={styles.image}
          source={{ uri: user?.avatar_url }}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
        <Text>{user?.username}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'start',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: 50,
    height: 50,
    backgroundColor: '#0553',
    borderRadius: 50,
  },
})
