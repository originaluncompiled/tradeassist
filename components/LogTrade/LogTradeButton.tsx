import { Text, Pressable, View } from 'react-native'
import { router } from 'expo-router'

const LogTradeButton = () => {

  return (
    <View className='absolute bottom-0 left-0 right-0 mx-4'>
      <Pressable
        className='rounded-lg mb-4 bg-green-2/75 active:bg-green-2 border border-green-2'
        onPress={() => {
          router.navigate('/(tabs)/tradehistory')
        }}
      >
        <Text className='text-lg text-dark-7 font-bold text-center p-3'>Log Trade</Text>
      </Pressable>
    </View>
  )
}

export default LogTradeButton