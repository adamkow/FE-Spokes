import { Slot, Stack } from 'expo-router';
import SignUpScreen from './signUp';

export default function AppLayout() {
  return (
  <Stack>
    <Stack.Screen name="signUp" />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    {/* <SignUpScreen />
    <Slot /> */}
  </Stack>
  );
}
