import { Text, FlatList } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import UserCard from './UserCard'
import Loading from './Loading'

export default function FriendsView({ requestsData, loading }) {
  if (loading) {
    return <Loading />
  }
  return (
    <>
      {requestsData.length === 0 ? (
        <Link href="UserList" className="border m-1 p-2 rounded-xl bg-green-50">
          <Text>Look for friends</Text>
        </Link>
      ) : (
        <FlatList
          data={requestsData}
          renderItem={({ item }) => <UserCard user={item} />}
          keyExtractor={(item) => item.user_id}
        />
      )}
    </>
  )
}
