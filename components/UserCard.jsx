import { Text, Pressable, View, StyleSheet, Image, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { AirbnbRating } from 'react-native-ratings'
import SendRequest from './SendRequest'
import UserView from './UserView'
import Rating from './Rating'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

export default function UserCard({ user }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [requestSent, setRequestSent] = useState(false)

  function onPress() {
    router.setParams({ user: user.user_id })
    openUserModal()
  }

  const openUserModal = () => {
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(!modalVisible)
    router.replace('/UserList')
  }

  useEffect(() => {
    const currRequestsStorage = JSON.parse(localStorage.getItem('sentRequests'))
    if (currRequestsStorage) {
      for (request of currRequestsStorage) {
          if (request.receiverId === user.user_id) {
              setRequestSent(true)
          }
      }
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
      <Rating isDisabled={true} rating={user.rating}/> 
      <SendRequest receiverId={user.user_id} setRequestSent={setRequestSent} requestSent={requestSent}/>
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <UserView setRequestSent={setRequestSent} requestSent={requestSent}/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={hideModal}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  }
})
