import React, { useEffect, useState } from 'react'
import { getAllUsers } from '@/api'
import { useAuth } from '@/contexts/authContext'
import { FlatList, Text, Pressable, View } from 'react-native'
import UserCard from '../../components/UserCard'
import FilterUsers from '../../components/FilterUsers'
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
  const { logout } = useAuth()

  useEffect(() => {
    getAllUsers().then((users) => {
      setUserList(users)
      setFilteredUsers(users)
    })
  }, [])

  useEffect(() => {
    filterUsers()
  }, [selectedFilters, userList])

  const handleLogout = async () => {
    await logout()
  }

  const updateSelectedFilters = (filters) => {
    setSelectedFilters(filters)
  }

  const filterUsers = () => {
    const filtered = userList.filter((user) => {
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
