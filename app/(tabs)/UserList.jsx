import React, { useEffect, useState } from 'react'
import { getAllUsersByLoggedInUserId } from '@/api'
import { FlatList, Pressable, View, Text } from 'react-native'
import UserCard from '../../components/UserCard'
import FilterUsers from '../../components/FilterUsers'
import LocationFilter from '@/components/LocationFilter'
import { useAuth } from '@/contexts/authContext'

export default function Users() {
  const [userList, setUserList] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const { user } = useAuth()
  const [selectedFilters, setSelectedFilters] = useState({
    age: '',
    type: '',
    distance: '',
    difficulty: '',
  })

  useEffect(() => {
    getAllUsersByLoggedInUserId(user.user_id).then((users) => {
      setUserList(users)
      setFilteredUsers(users)
    })
  }, [user])

  useEffect(() => {
    filterUsers()
  }, [selectedFilters, userList])

  const handleLocationSearch = (town) => {
    getAllUsersByLoggedInUserId(user.user_id, town).then((users) => {
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
            backgroundColor: '#2D23FF',
            width: 100,
            marginTop: 30,
            borderRadius: 10,
            marginBottom: 10,
          }}
          onPress={() => setShowFilters(true)}
        >
          <Text style={{ color: '#FFFFFF' }}>Filters</Text>
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
