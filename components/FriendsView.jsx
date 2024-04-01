import { Text, FlatList } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import UserCard from './UserCard'

export default function FriendsView({ requestsData }) {
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
