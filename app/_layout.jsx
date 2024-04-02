import { Stack, useRouter, useSegments } from 'expo-router'
import { AuthContextProvider, useAuth } from '@/contexts/authContext'
import { LoggedUserInfoForDevProvider } from '@/contexts/LoggedUserInfoForDevContext'
import { useEffect } from 'react'
import '../global.css'

const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    // check if user is authenticated
    if (typeof isAuthenticated === 'undefined') return
    const inApp = segments[0] === '(tabs)'
    if (isAuthenticated && !inApp) {
      // redirect to userList
      router.replace('UserList')
    } else if (isAuthenticated === false) {
      //redirect to signin
      router.replace('SignIn')
    }
  }, [isAuthenticated])

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
