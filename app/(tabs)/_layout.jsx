import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs, router } from 'expo-router'
import { Pressable } from 'react-native'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="UserList"
        options={{
          title: 'Search',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="comments" color={color} />
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={() => {
                router.replace('/(tabs)/messages')
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="comments" color={color} />
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={() => {
                router.replace('/(tabs)/userProfile')
              }}
            />
          ),
        }}
      />
    </Tabs>
  )
}
