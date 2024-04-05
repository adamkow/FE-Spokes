import { Text, FlatList, View } from 'react-native'
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
        <Link
          href="UserList"
          className="text-center border mx-5 p-3 rounded-md"
          style={{ backgroundColor: '#101be8' }}
        >
          <Text className="text-white">Look for friends</Text>
        </Link>
      ) : (
        <View className="flex-1 justify-center">
          <FlatList
            scrollEnabled={true}
            data={requestsData}
            renderItem={({ item }) => <UserCard user={item} />}
            keyExtractor={(item) => item.user_id}
          />
        </View>
      )}
    </>
  )
}
