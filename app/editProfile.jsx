import React, { useState, useEffect } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import axios from 'axios'

export default function EditProfile() {
  const [filters, setFilters] = useState([])

  useEffect(() => {
    axios
      .get('https://spokes-yrzx.onrender.com/api/filters')
      .then((response) => {
        setFilters(response.data)
      })
      .catch((error) => {
        console.error('Error fetching filters:', error)
      })
  }, [])

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
      />
      <TextInput style={styles.input} placeholder="City" />
      <Button title="Save Changes" onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
})
