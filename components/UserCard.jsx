import { Text, Pressable, View, StyleSheet, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import SendRequest from './SendRequest'
import UserView from './UserView'
import Rating from './Rating'
import { patchRequest } from '@/api'
import ModalWrapper from './ModalWrapper'
import { LoggedUserInfoForDevContext } from '@/contexts/LoggedUserInfoForDevContext'
import {
  addRoomToChatRooms,
  blurhash,
  createRoomIfNotExists,
  getRoomId,
} from '@/utilis/common'

export default function UserCard({ user, setUserList }) {
  const [userViewModalVisible, setUserViewModalVisible] = useState(false)
  const [ratingModalVisible, setRatingModalVisible] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  const [roomId, setRoomId] = useState()
  const { loggedInUserInfo } = useContext(LoggedUserInfoForDevContext)

  function onPress() {
    router.setParams({ user_id: user.user_id })
    setUserViewModalVisible(true)
  }

  const changeRequestStatus = (body) => {
    patchRequest(user.request_id, body)
      .then((requestFromAPI) => {
        setUserList((currList) => {
          const updatedList = currList.filter(
            (currUser) => user.request_id !== currUser.request_id
          )
          return updatedList
        })
      })
      .catch((err) => console.error('Error patching a request: ', err))
  }

  const prepareChatRoom = async () => {
    const participants = {
      [loggedInUserInfo.user_id]: {
        user_id: loggedInUserInfo.user_id,
        username: loggedInUserInfo.username,
        avatar_url: loggedInUserInfo.avatar_url,
      },

      [user.user_id]: {
        user_id: user.user_id,
        username: user.username,
        avatar_url: user.avatar_url,
      },
    }
    createRoomIfNotExists(roomId, participants)
    addRoomToChatRooms(roomId, loggedInUserInfo.user_id)
  }

  useEffect(() => {
    if (loggedInUserInfo.user_id === user.sender_id) {
      setRequestSent(true)
    }
    if (user.status === 'accepted') {
      const roomId = getRoomId(loggedInUserInfo.user_id, user.user_id)
      setRoomId(roomId)
    }
  }, [])

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

      <Rating
        currentUserId={user.user_id}
        ratingCount={user.rating_count}
        isDisabled={true}
        rating={user.rating}
      />

      {user.status === 'accepted' ? (
        <View>
          <Link
            href={{
              pathname: 'messages',
              params: { chat_room: roomId },
            }}
            className="border m-1 p-2 flex items-center text-center rounded-xl bg-green-50 "
            onPress={prepareChatRoom}
          >
            <Text>Chat</Text>
          </Link>

          <Pressable
            onPress={() => {
              setRatingModalVisible(true)
            }}
            className="border m-1 p-2 flex items-center rounded-xl bg-blue-50 "
          >
            <Text>Rate</Text>
          </Pressable>

          <ModalWrapper
            modalVisible={ratingModalVisible}
            setModalVisible={setRatingModalVisible}
          >
            <Rating
              currentUserId={user.user_id}
              ratingCount={user.rating_count}
              isDisabled={false}
              rating={0}
            />
          </ModalWrapper>
        </View>
      ) : (
        <>
          {loggedInUserInfo.user_id === user.receiver_id ? (
            <View className="flex-row gap-4 justify-center">
              <Pressable
                className="border m-1 p-2 flex items-center rounded-xl bg-green-50 "
                onPress={() => changeRequestStatus({ status: 'accepted' })}
              >
                <Text>Accept</Text>
              </Pressable>

              <Pressable
                className="border m-1 p-2 flex items-center rounded-xl bg-red-50"
                onPress={() => changeRequestStatus({ status: 'rejected' })}
              >
                <Text>Decline</Text>
              </Pressable>
            </View>
          ) : (
            <SendRequest
              requestId={user.request_id}
              receiverId={user.user_id}
              requestSent={requestSent}
              setRequestSent={setRequestSent}
              setUserList={setUserList}
            />
          )}
        </>
      )}
      <ModalWrapper
        modalVisible={userViewModalVisible}
        setModalVisible={setUserViewModalVisible}
      >
        <UserView
          requestId={user.request_id}
          isFriend={user.status === 'accepted'}
          isSender={
            user.status === 'pending' && user.sender_id === user.user_id
          }
          requestSent={requestSent}
          setRequestSent={setRequestSent}
          setUserList={setUserList}
          changeRequestStatus={changeRequestStatus}
          setRatingModalVisible={setRatingModalVisible}
        />
      </ModalWrapper>
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
    borderRadius: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    width: 400,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
