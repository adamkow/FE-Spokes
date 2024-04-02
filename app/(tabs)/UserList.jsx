import { getAllUsers } from '@/api'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/authContext'
import { FlatList, Text, Pressable, ScrollView, View } from 'react-native'
import UserCard from '../../components/UserCard'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

export default function Users() {
  const [userList, setUserList] = useState([])
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  useEffect(() => {
    getAllUsers().then((users) => {
      setUserList(users)
    })
  }, [])

  return (
    <>
      <SafeAreaProvider>
        <View showsVerticalScrollIndicator className="flex-1">
          <Pressable onPress={handleLogout} className="pt-5">
            <Text>Log Out</Text>
          </Pressable>
          <FlatList
            data={userList}
            renderItem={({ item }) => (
              <UserCard user={item} setUserList={setUserList} />
            )}
            keyExtractor={(item) => item.user_id}
          />
        </View>
      </SafeAreaProvider>
    </>
  )
}
