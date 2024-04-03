import { getUserByUserID } from '@/api'
import { auth } from '@/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [newUserId, setNewUserId] = useState(undefined)
  const [isAuthenticated, setIsAuthenticated] = useState(undefined)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    })
    return unsub
  }, [])

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      getUserByUserID(response.user.uid).then((res) => {
        setUser(res)
      })
      return { success: true }
    } catch (e) {
      let msg = e.message
      if (msg.includes('(auth/invalid-email')) msg = 'Invalid email'
      if (msg.includes('(auth/invalid-login-credentials'))
        msg = 'Incorrect email or password'
      return { success: false, msg }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      return { success: true }
    } catch (e) {
      return { success: false, msg: e.message, error: e }
    }
  }

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      setNewUserId(response?.user.uid)

      return { success: true, data: response?.user }
    } catch (e) {
      let msg = e.message
      if (msg.includes('(auth/invalid-email')) msg = 'Invalid email'
      if (msg.includes('(auth/email-already-in-use'))
        msg = 'Email already in use'
      return { success: false, msg }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        newUserId,
        setIsAuthenticated,
        setUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const value = useContext(AuthContext)

  if (!value) {
    throw new Error('useAuth mustbe wrapped inside AuthContextProvider')
  }
  return value
}
