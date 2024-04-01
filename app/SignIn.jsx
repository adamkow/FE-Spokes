import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@/contexts/authContext'

export default function SignInScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, setIsAuthenticated } = useAuth()

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Sign In', 'Please fill all the fields!')
      return
    }

    const response = await login(email, password)
    if (!response.success) {
      Alert.alert('Sign In', response.msg)
    } else {
      setIsAuthenticated(true)
    }
  }

  return (
    <View style={styles.container}>
      <Text className="text-center" style={styles.title}>
        Sign In
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'white'}
        value={email}
        onChangeText={(newEmail) => {
          setEmail(newEmail)
        }}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'white'}
        value={password}
        onChangeText={(newPassword) => {
          setPassword(newPassword)
        }}
        secureTextEntry
      />
      <Text style={{ color: 'white' }} className="text-white text-right">
        Forgotten Password?
      </Text>
      <Button
        title="Sign In"
        onPress={() => {
          handleSignIn()
        }}
      />

      <View className="flex-row justify-center">
        <Text className="text-white">Don't have an account? </Text>
        <Pressable onPress={() => router.push('signUp')}>
          <Text style={{ color: 'white' }} className="text-white text-blue-500">
            Sign Up
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const isDarkTheme = true

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: isDarkTheme ? 'black' : 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: isDarkTheme ? 'white' : 'black',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: isDarkTheme ? 'white' : 'gray',
    borderRadius: 5,
    color: isDarkTheme ? 'white' : 'black',
  },
})
