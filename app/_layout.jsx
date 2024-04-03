import { Stack, useRouter, useSegments } from 'expo-router'
import { AuthContextProvider, useAuth } from '@/contexts/authContext'
import { LoggedUserInfoForDevProvider } from '@/contexts/LoggedUserInfoForDevContext'
import { useEffect, useState } from 'react'
import SplashScreen from './SplashScreen';

const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const segments = useSegments()
  const router = useRouter()
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showSplash) {
      handleAuthentication()
    }
  }, [showSplash])

  const handleAuthentication = () => {
    const inApp = segments[0] === '(tabs)'
    if (isAuthenticated && !inApp) {
      router.replace('UserList')
    } else if (isAuthenticated === false) {
      router.replace('SignIn')
    }
  }

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <Stack>
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <LoggedUserInfoForDevProvider>
        <MainLayout />
      </LoggedUserInfoForDevProvider>
    </AuthContextProvider>
  )
}