import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Alert,
  Platform,
} from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@/contexts/authContext'
import showAlert from '@/components/alerts'
import ForgotPasswordScreen from './ForgotPasswordScreen'

export default function SignInScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, setIsAuthenticated } = useAuth()

  const handleSignIn = async () => {
    if (!email || !password) {
      showAlert('Sign In', 'Please fill all the fields!')
      return
    }

    const response = await login(email, password)
    if (!response.success) {
      showAlert('Sign In', response.msg)
    } else {
      setIsAuthenticated(true)
    }
  }

  const goToSignUp = () => {
    router.push('signUp')
  }

  const handleForgotPassword = () => {
    router.replace('ForgotPasswordScreen')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'white'}
        value={email}
        onChangeText={(newEmail) => setEmail(newEmail)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'white'}
        value={password}
        onChangeText={(newPassword) => setPassword(newPassword)}
        secureTextEntry
      />
      <Pressable onPress={handleForgotPassword}>
        <Text style={{ color: 'white', marginBottom: 10 }}>
          Forgotten Password?
        </Text>
      </Pressable>
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={handleSignIn} color="#841584" />
      </View>


      <View style={styles.signUpLink}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <Pressable onPress={goToSignUp}>
          <Text
            style={[styles.link, { textDecorationLine: 'underline' }]}
            className="text-white text-blue-500"
          >
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
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  signUpLink: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    color: isDarkTheme ? 'white' : 'black',
  },
  link: {
    marginLeft: 5,
  },
  forgotPasswordBox: {
    alignItems: 'center',
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: 'white',
  },
})
