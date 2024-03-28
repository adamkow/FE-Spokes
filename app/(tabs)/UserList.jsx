import { getAllUsers } from '@/api'
import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import UserCard from '../../components/UserCard'

export default function Users() {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    getAllUsers().then((users) => {
      setUserList(users)
    })
  }, [])

  return (
    <>
      <View className="flex-1 justify-center items-center">
        <FlatList
          data={userList}
          renderItem={({ item }) => <UserCard user={item} />}
          keyExtractor={(item) => item.user_id}
        />
      </View>
    </>
  )
}
