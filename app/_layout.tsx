import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import './global.css'

const RootLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ animation: 'none' }}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='trade-history' options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
};

export default RootLayout;
