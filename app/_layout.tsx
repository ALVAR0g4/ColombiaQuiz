import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="registro" />
      <Stack.Screen name="game" />
      <Stack.Screen name="resultado" />
      <Stack.Screen name="ranking" />
    </Stack>
  );
}
