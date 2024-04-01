import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getUserByUserID } from '@/api'
import SendRequest from './SendRequest'
import Rating from './Rating'
import { UserIdForDevContext } from '@/contexts/UserIdForDevContext'

export default function UserView({
  requestSent,
  setRequestSent,
  isFriend,
  setUserList,
  requestId,
}) {
  const [currUserProfile, setCurrUserProfile] = useState({})
  const { user } = useLocalSearchParams()
  const { loggedInUserId } = useContext(UserIdForDevContext)

  useEffect(() => {
    getUserByUserID(user).then((userProfile) => {
      setCurrUserProfile(userProfile)
    })
  }, [])

  const handleChat = (loggedInUserId, friendId) => {
    // implement chat
  }

  return (
    <View className="flex-1 m-5 justify-start items-center gap-3">
      <Text className="font-bold text-lg">{currUserProfile.username}</Text>
      <Image
        style={styles.image}
        source={{ uri: currUserProfile.avatar_url }}
      />
      <Rating
        currentUserId={currUserProfile.user_id}
        isDisabled={true}
        rating={currUserProfile.rating}
      />
      <Text className="text-center">{currUserProfile.bio}</Text>
      <Text>{currUserProfile.city}</Text>
      <Text>{currUserProfile.type_of_biking}</Text>
      <Text>{currUserProfile.difficulty}</Text>
      <Text>{currUserProfile.distance}</Text>
      {isFriend ? (
        <Pressable
          className="border m-1 p-2 flex items-center rounded-xl bg-green-50 "
          onPress={() => handleChat(loggedInUserId, currUserProfile.user_id)}
        >
          <Text>Chat</Text>
        </Pressable>
      ) : (
        <SendRequest
          receiverId={currUserProfile.user_id}
          setRequestSent={setRequestSent}
          requestSent={requestSent}
          setUserList={setUserList}
          requestId={requestId}
        />
      )}
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
