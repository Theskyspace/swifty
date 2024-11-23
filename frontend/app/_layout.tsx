import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="loginScreen" options={{ headerShown: false }} />
  </Stack>
}
