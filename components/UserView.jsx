import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getUserByUserID } from '@/api'
import SendRequest from './SendRequest'
import Rating from './Rating'

export default function UserView({ requestSent, setRequestSent }) {
  const [currUserProfile, setCurrUserProfile] = useState({})
  const { user } = useLocalSearchParams()

  useEffect(() => {
    getUserByUserID(user).then((userProfile) => {
      setCurrUserProfile(userProfile)
    })
  }, [])

  return (
    <View className="flex-1 m-5 justify-start items-center gap-3">
      <Text className="font-bold text-lg">{currUserProfile.username}</Text>
      <Image
        style={styles.image}
        source={{ uri: currUserProfile.avatar_url }}
      />
      <Rating isDisabled={true} rating={currUserProfile.rating} />
      <Text className="text-center">{currUserProfile.bio}</Text>
      <Text>{currUserProfile.city}</Text>
      <Text>{currUserProfile.type_of_biking}</Text>
      <Text>{currUserProfile.difficulty}</Text>
      <Text>{currUserProfile.distance}</Text>
      <SendRequest
        receiverId={currUserProfile.user_id}
        setRequestSent={setRequestSent}
        requestSent={requestSent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#0553',
    borderRadius: '50%',
  },
})
