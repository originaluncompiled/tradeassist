import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import './global.css'

const RootLayout = () => {
  return (
    // https://icons.expo.fyi/Index
    // darkmode: colors.dark.neutral_8; lightmode: colors.white (OR, colors.dark.neutral_1)
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark.neutral_8 }}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }}/>
      </Stack>
    </SafeAreaView>
  );
}

export default RootLayout