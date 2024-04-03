import React, { useEffect, useState } from 'react'
import { getAllUsers, getUsersByLocation } from '@/api' // Make sure to import getUsersByLocation
import { useAuth } from '@/contexts/authContext'
import { FlatList, Pressable, View, Text } from 'react-native'
import UserCard from '../../components/UserCard'
import FilterUsers from '../../components/FilterUsers'
import LocationFilter from '@/components/LocationFilter'

export default function Users() {
  const [userList, setUserList] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    age: '',
    type: '',
    distance: '',
    difficulty: '',
  })

  useEffect(() => {
    getAllUsers().then((users) => {
      setUserList(users)
      setFilteredUsers(users)
    })
  }, [])

  const handleLocationSearch = (town) => {
    getUsersByLocation(town).then((users) => {
      setUserList(users)
      setFilteredUsers(users)
    })
  }

  return (
    <>
      <View className="flex-1 pt-5">
        <Pressable
          style={{
            alignItems: 'center',
            padding: 10,
            backgroundColor: 'lightgray',
          }}
          onPress={() => setShowFilters(true)}
        >
          <Text>Filters</Text>
        </Pressable>
        <LocationFilter onSearch={handleLocationSearch} />
        <FlatList
          data={filteredUsers}
          renderItem={({ item }) => (
            <UserCard user={item} setUserList={setUserList} />
          )}
          keyExtractor={(item) => item.user_id}
        />
      </View>
      <FilterUsers
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onUpdateFilters={setSelectedFilters}
      />
    </>
  )
}
