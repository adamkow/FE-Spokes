import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { Link } from 'expo-router'
import UserCard from './UserCard'
import Loading from './Loading'

export default function RequestsView({
  requestsData,
  requestsType,
  setRequestsType,
  setRequestsData,
  loading,
}) {
  const typeValues = ['all', 'received', 'sent']

  if (loading) {
    return <Loading />
  }
  return (
    <>
      <View className="flex items-center  rounded-md m-1 p-2 bg-slate-200">
        <Picker
          selectedValue={requestsType}
          style={styles.dropdown}
          onValueChange={(itemValue) => setRequestsType(itemValue)}
          aria-label="Select type of requests"
        >
          {typeValues.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>
      {requestsData.length === 0 ? (
        <Link
          href="UserList"
          className="border m-1 text-center p-2 rounded-xl bg-green-50"
        >
          <Text>Send some requests</Text>
        </Link>
      ) : (
        <>
          <View className="flex justify-center ">
            <FlatList
              data={requestsData}
              renderItem={({ item }) => (
                <UserCard user={item} setUserList={setRequestsData} />
              )}
              keyExtractor={(item) => item.user_id}
            />
          </View>
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
})
