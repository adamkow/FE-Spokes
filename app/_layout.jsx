import { Slot, Stack } from 'expo-router'
import SignUpScreen from '.'

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <SignUpScreen />
    <Slot /> */}
    </Stack>
  )
}
