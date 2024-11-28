import { router, Stack } from 'expo-router'
import { colors } from '@/constants/colors'
import { Pressable, Text } from 'react-native'
import useDisplayDelete from '@/hooks/useDisplayDelete'

const Layout = () => {
  const { setShowModal, showDelete } = useDisplayDelete();
  const handleDeleteClick = async () => {
    setShowModal(true);
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.dark.neutral_8,
        },
        headerTintColor: colors.dark.neutral_2,
        headerShadowVisible: false,
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen
        name='taketrade'
        options={{
          title: 'Take a Trade',
          headerBackVisible: false,
          headerLeft: () => {
            return (
              <Pressable
                className='rounded-lg px-2'
                onPressOut={() => setTimeout(() => {router.navigate('/(tabs)/tradehistory')}, 50)}
                hitSlop={12}
              >
                <Text className='text-lg font-semibold text-dark-3'>Cancel</Text>
              </Pressable>
            )
          }
        }}
      />
      <Stack.Screen
        name='logtrade'
        options={{
          title: 'Log a Trade',
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable
              className='rounded-lg px-2'
              onPressOut={() => setTimeout(() => {router.navigate('/(tabs)/tradehistory')}, 50)}
              hitSlop={12}
            >
              <Text className='text-lg font-semibold text-dark-3'>Cancel</Text>
            </Pressable>
          ),
          headerRight: () => showDelete && (
            <Pressable
              className='rounded-lg px-2'
              onPressOut={() => setTimeout(() => {
                handleDeleteClick();
              }, 50)}
              hitSlop={12}
            >
              <Text className='text-lg font-semibold text-accent-red'>Delete</Text>
            </Pressable>
          )
        }}
      />
    </Stack>
  );
};

export default Layout;