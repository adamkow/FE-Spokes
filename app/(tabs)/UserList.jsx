
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

export default function Users() {
  const [userList, setUserList] = useState([]);
  const {logout} = useAuth()

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
            <UserCard user={item} setUserList={setUserList} />
          )}
          keyExtractor={(item) => item.user_id}
        />
      </View>
    </>
  )
}
