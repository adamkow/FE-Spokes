import { Text, Pressable, View, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { AirbnbRating } from 'react-native-ratings'
import { deleteRequest, sendRequest } from '@/api'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

export default function UserCard({ user, openUserModal }) {
  const [requestSent, setRequestSent] = useState(false)
  const [requestId, setRequestId] = useState(null)
  function onPress() {
    router.setParams({ user: user.user_id })
    openUserModal()
  }

  const handleSendRequest = () => {
    // when userContext change it for logged user_id
    sendRequest(1, user.user_id).then((requestFromApi) => {
      setRequestId(requestFromApi.request_id)
    })
    setRequestSent(true)
  }

  const handleDeleteRequest = () => {
    deleteRequest(requestId)
    setRequestSent(false)
  }

  return (
    <View className="m-5 p-5 border">
      <Pressable onPress={onPress}>
        <Text>{user.username}</Text>
        <View className="flex-row gap-3 items-center">
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{ uri: user.avatar_url }}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
            />
          </View>
          <Text>{user.type_of_biking}</Text>
          <Text>{user.difficulty}</Text>
        </View>
      </Pressable>
      <AirbnbRating
        showRating={false}
        count={5}
        defaultRating={user.rating}
        size={20}
        isDisabled={true}
      />
      {!requestSent && (
        <Pressable
          className="border m-1 p-1 flex items-center rounded-xl bg-green-200"
          onPress={handleSendRequest}
        >
          <Text>Send request</Text>
        </Pressable>
      )}

      {requestSent && (
        <Pressable
          className="border m-1 p-1 flex items-center rounded-xl  bg-red-300"
          onPress={handleDeleteRequest}
        >
          <Text>Unsend request</Text>
        </Pressable>
      )}
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
    width: 100,
    height: 100,
    backgroundColor: '#0553',
    borderRadius: '50%',
  },
})
