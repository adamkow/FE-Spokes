import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { getUserByUserID } from '@/api'
import SendRequest from './SendRequest'
import Rating from './Rating'
import { useAuth } from '@/contexts/authContext'
import {
  addRoomToChatRooms,
  createRoomIfNotExists,
  getRoomId,
} from '@/utilis/common'

export default function UserView({
  requestSent,
  setRequestSent,
  isFriend,
  isSender,
  setUserList,
  requestId,
  changeRequestStatus,
  setRatingModalVisible,
}) {
  const [currUserProfile, setCurrUserProfile] = useState({})
  const [roomId, setRoomId] = useState()
  const { user_id } = useLocalSearchParams()
  const { user: loggedInUserInfo } = useAuth()

  useEffect(() => {
    getUserByUserID(user_id).then((userProfile) => {
      setCurrUserProfile(userProfile)
    })
    if (isFriend) {
      const roomId = getRoomId(loggedInUserInfo.user_id, user_id)
      setRoomId(roomId)
    }
  }, [])

  const handleRoom = () => {
    const participants = {
      [loggedInUserInfo.user_id]: {
        user_id: loggedInUserInfo.user_id,
        username: loggedInUserInfo.username,
        avatar_url: loggedInUserInfo.avatar_url,
      },

      [currUserProfile.user_id]: {
        user_id: currUserProfile.user_id,
        username: currUserProfile.username,
        avatar_url: currUserProfile.avatar_url,
      },
    }
    createRoomIfNotExists(roomId, participants)
    addRoomToChatRooms(roomId, loggedInUserInfo.user_id)
  }
  return (
    <View className="flex-1  justify-center items-center gap-3 bg-gray-200">
      <Text className="font-bold text-xl">{currUserProfile.username}</Text>
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
      <View className="flex-col justify-center items-center m-1 gap-1">
        <View className="flex-row gap-3">
          <Text className="font-bold">Location:</Text>
          <Text>{currUserProfile.city}</Text>
        </View>
        <View className="flex-row gap-3">
          <Text className="font-bold">Experience:</Text>
          <Text>{currUserProfile.difficulty}</Text>
        </View>
        <View className="flex-row gap-3">
          <Text className="font-bold">Preferred type:</Text>
          <Text>{currUserProfile.type_of_biking}</Text>
        </View>
        <View className="flex-row gap-3">
          <Text className="font-bold">Preferred distance:</Text>
          <Text>{currUserProfile.distance}</Text>
        </View>
      </View>
      {isFriend ? (
        <View className="flex-row">
          <Link
            href={{
              pathname: 'messages',
              params: { chat_room: roomId },
            }}
            className="m-1 mt-7 p-2 px-8 flex items-center rounded-xl bg-green-300 "
            onClick={handleRoom}
          >
            <Text>Chat</Text>
          </Link>
          <Pressable
            onPress={() => {
              setRatingModalVisible(true)
            }}
            style={{ backgroundColor: '#2D23FF' }}
            className="m-1 mt-7 p-2 px-8 flex items-center rounded-xl"
          >
            <Text className="text-white">Rate</Text>
          </Pressable>
        </View>
      ) : isSender ? (
        <View className="flex-row gap-4 justify-center">
          <Pressable
            className="m-1 mt-7 p-2 px-8 flex items-center rounded-xl bg-green-300"
            onPress={() => changeRequestStatus({ status: 'accepted' })}
          >
            <Text>Accept</Text>
          </Pressable>

          <Pressable
            className="m-1 mt-7 p-2 px-8 flex items-center rounded-xl bg-red-500"
            onPress={() => changeRequestStatus({ status: 'rejected' })}
          >
            <Text>Decline</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <SendRequest
            receiverId={currUserProfile.user_id}
            setRequestSent={setRequestSent}
            requestSent={requestSent}
            setUserList={setUserList}
            requestId={requestId}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    backgroundColor: '#0553',
    borderRadius: 50,
  },
})
