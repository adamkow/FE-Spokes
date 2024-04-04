import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import axios from 'axios'
import { router } from 'expo-router'
import { useAuth } from '@/contexts/authContext'
import { deleteUser } from '@/api'
import { getAuth, deleteUser as deleteFirebaseUser } from 'firebase/auth'

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
  const handleDeleteAccount = async () => {
    const auth = getAuth()
    const firebaseUser = auth.currentUser

    deleteUser(user.user_id)
      .then(async () => {
        try {
          await deleteFirebaseUser(firebaseUser)
          console.log('Firebase user deleted successfully')
          await logout()
          router.push('SignIn')
        } catch (error) {
          console.error('Failed to delete Firebase user:', error)
        }
      })
      .catch((error) => {
        console.error('Failed to delete user from PostgreSQL:', error)
      })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userData ? (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: user.avatar_url }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
          <Text style={{ fontSize: 18, marginBottom: 5 }}>{user.username}</Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>{user.email}</Text>
          <View className="flex-col justify-center items-center m-1 gap-1 mb-4">
            <View className="flex-row gap-3">
              <Text className="font-bold">Bio:</Text>
              <Text>{user.bio}</Text>
            </View>
            <View className="flex-row gap-3">
              <Text className="font-bold">Age:</Text>
              <Text>{user.age}</Text>
            </View>
            <View className="flex-row gap-3">
              <Text className="font-bold">Region:</Text>
              <Text>{user.region}</Text>
            </View>
            <View className="flex-row gap-3">
              <Text className="font-bold">City:</Text>
              <Text>{`${user.city[0].toUpperCase()}${user.city.slice(
                1
              )}`}</Text>
            </View>
            <View className="flex-row gap-3">
              <Text className="font-bold">Preferred distance:</Text>
              <Text>{user.distance}</Text>
            </View>

            <View className="flex-row gap-3">
              <Text className="font-bold">Experience:</Text>
              <Text>{user.difficulty}</Text>
            </View>
            <View className="flex-row gap-3">
              <Text className="font-bold">Preferred type:</Text>
              <Text>{user.type_of_biking}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              router.push('editProfile')
            }}
            style={{
              backgroundColor: 'blue',
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
              width: 140,
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              backgroundColor: 'blue',
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
              width: 140,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Sign Out
            </Text>
          </TouchableOpacity>
          <Pressable
            onPress={handleDeleteAccount}
            style={{ marginTop: 10, backgroundColor: 'red', borderRadius: 5 }}
          >
            <Text
              style={{
                color: 'white',
                padding: 10,
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              Delete Account
            </Text>
          </Pressable>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  )
}
