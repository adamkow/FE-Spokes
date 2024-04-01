import { getAllUsers } from "@/api";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import {
  FlatList,
  Text,
  View,
  Modal,
  StyleSheet,
  Pressable,
  Button,
} from 'react-native'
import UserCard from '../../components/UserCard'
import UserView from '@/components/UserView'
import { router } from 'expo-router'

export default function Users() {
  const [userList, setUserList] = useState([]);
  const {logout} = useAuth()
  const [modalVisible, setModalVisible] = useState(false)

  const openUserModal = () => {
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(!modalVisible)
    router.replace('/UserList')
  }

  const handleLogout = async () => {
    await logout();
  }

  useEffect(() => {
    getAllUsers().then((users) => {
      setUserList(users)
    })
  }, [])

  return (
    <>
      <View className="flex-1 justify-center items-center">
      <Pressable onPress={handleLogout} className="pt-5"><Text>Log Out</Text></Pressable>
        <FlatList
          data={userList}
          renderItem={({ item }) => (
            <UserCard user={item} openUserModal={openUserModal} />
          )}
          keyExtractor={(item) => item.user_id}
        />
      </View>

      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>User View</Text>
            <UserView />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={hideModal}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  )
}
const styles = StyleSheet.create({
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
