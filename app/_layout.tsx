import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import './global.css'
import { SQLiteProvider } from 'expo-sqlite'
import migrateDbIfNeeded from '@/hooks/migrateDbIfNeeded';

const RootLayout = () => {
  return (
    <SQLiteProvider
      databaseName="trades.db" 
      onInit={migrateDbIfNeeded}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ animation: 'none' }}>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='trade-history' options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SQLiteProvider>
  );
};

export default RootLayout;
