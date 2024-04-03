import React, { useEffect, useState } from 'react'
import { getAllUsers, getUsersByLocation } from '@/api'
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

  useEffect(() => {
    filterUsers()
  }, [selectedFilters, userList])

  const handleLocationSearch = (town) => {
    getUsersByLocation(town).then((users) => {
      setUserList(users)
      filterUsers(users)
    })
  }

  const updateSelectedFilters = (filters) => {
    setSelectedFilters(filters)
  }

  const filterUsers = (users = userList) => {
    const filtered = users.filter((user) => {
      const matchesAge = selectedFilters.age
        ? user.age === selectedFilters.age
        : true
      const matchesType = selectedFilters.type
        ? user.type_of_biking === selectedFilters.type
        : true
      const matchesDistance = selectedFilters.distance
        ? user.distance === selectedFilters.distance
        : true
      const matchesDifficulty = selectedFilters.difficulty
        ? user.difficulty === selectedFilters.difficulty
        : true
      return matchesAge && matchesType && matchesDistance && matchesDifficulty
    })
    setFilteredUsers(filtered)
  }

  return (
    <>
      <View style={{ flex: 1, paddingTop: 5, alignItems: 'center' }}>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: '#2196F3',
            width: 80,
            marginTop: 30,
            borderRadius: 10,
            marginBottom: 10,
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
        onUpdateFilters={updateSelectedFilters}
      />
    </>
  )
}
