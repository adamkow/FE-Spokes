import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Pressable,
} from 'react-native'
import axios from 'axios'
import { router } from 'expo-router'
import { useAuth } from "@/contexts/authContext";

export default function UserProfile({ navigation }) {
  const [userData, setUserData] = useState(null)
  const { logout, user } = useAuth()

  const handleSignOut = async () => {
    await logout()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://spokes-yrzx.onrender.com/api/users/1'
        )
        setUserData(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userData ? (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: user.avatar_url }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            Name: {user.username}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            Email: {user.email}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            Age: {user.age}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            Region: {user.region}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            City: {user.city}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            Bio: {user.bio}
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push('editProfile')
            }}
            style={{
              backgroundColor: 'blue',
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white' }}>edit profile</Text>
          </TouchableOpacity>
          <Pressable onPress={handleSignOut} className="pt-10"><Text className="bg-indigo-600 text-white rounded text-xl p-3">Sign Out</Text>
          </Pressable>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  )
}
