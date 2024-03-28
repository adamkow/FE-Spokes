import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import { router } from 'expo-router'

export default function UserProfile({ navigation }) {
  const [userData, setUserData] = useState(null)

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
            source={{ uri: userData.user.avatar_url }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            Name: {userData.user.username}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            Email: {userData.user.email}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            Age: {userData.user.age}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            Region: {userData.user.region}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            City: {userData.user.city}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            Bio: {userData.user.bio}
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
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  )
}
