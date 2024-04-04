import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Text,
  Pressable,
} from 'react-native'
import { useAuth } from '@/contexts/authContext'
import { router } from 'expo-router'
import showAlert from '@/components/alerts'
import axios from 'axios'

export default function SignUpScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { register } = useAuth()

  const handleSignUp = async () => {
    if (!email || !password) {
      showAlert('Sign Up', 'Please fill all the fields!')
      return
    }

    if (password !== confirmPassword) {
      showAlert('Sign Up', 'Passwords do not match!')
      return
    }

    let response = await register(email, password)

    if (!response.success) {
      showAlert('Sign Up', response.msg)
    } else {
      axios
        .post('https://spokes-yrzx.onrender.com/api/users/', {
          user_id: response.data.uid,
          username: 'username',
          email: email,
          bio: 'bio',
          region: 'East Midlands',
          city: 'derby',
          type_of_biking: 'Mountain',
          difficulty: 'Novice',
          distance: 'less than 25 km',
          age: '18 - 25',
          avatar_url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5GOMxZRRvTEzYHX3-XuiZ5PqYRXQJ4APh3-vmINzcX8MkxEHbD8nyR7DOx84Rd-Ff0xU&usqp=CAU',
          rating: 0,
        })
        .then(() => {
          router.push('createUser')
        })
        .catch((error) => {
          console.error('Error creating user:', error)
        })
    }
  }

  const goToSignIn = () => {
    router.push('SignIn')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor={'white'}
        value={confirmPassword}
        onChangeText={(newConfirmPassword) => {
          setConfirmPassword(newConfirmPassword)
        }}
        secureTextEntry
      />
      <Button
        title="Sign Up"
        onPress={() => {
          handleSignUp()
        }}
        color="#841584"
      />
      <View style={styles.signUpLink}>
        <Text style={styles.signInLink}>Already have an account? </Text>
        <Pressable onPress={goToSignIn}>
          <Text
            style={[styles.link, { textDecorationLine: 'underline' }]}
            className="text-white text-blue-500"
          >
            Sign In
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
    alignItems: 'center',
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
  signUpLink: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInLink: {
    marginTop: 10,
    color: isDarkTheme ? 'white' : 'black',
  },
  link: {
    textDecorationLine: 'underline',
  },
})
