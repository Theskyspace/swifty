import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index" 
      />
      <Stack.Screen 
        name="signup" 
        options={{ 
          presentation: 'card'
        }} 
      />
      <Stack.Screen 
        name="home"
        options={{
          // Prevent going back to auth screens
          gestureEnabled: false,
          headerBackVisible: false
        }}
      />
    </Stack>
  );
}
