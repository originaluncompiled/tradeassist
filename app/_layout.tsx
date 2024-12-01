import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import './global.css'
import { SQLiteProvider } from 'expo-sqlite'
import migrateDbIfNeeded from '@/hooks/migrateDbIfNeeded'
import * as SystemUI from 'expo-system-ui'
import { colors } from '@/constants/colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const RootLayout = () => {
  SystemUI.setBackgroundColorAsync(colors.dark.neutral_8);

  return (
    <SQLiteProvider
      databaseName="trades.db" 
      onInit={migrateDbIfNeeded}
    >
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark.neutral_8 }}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: colors.dark.neutral_8 
                }
              }}>
              <Stack.Screen name='(tabs)' />
              <Stack.Screen name='trade-history' />
            </Stack>
          </SafeAreaView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
};

export default RootLayout;
