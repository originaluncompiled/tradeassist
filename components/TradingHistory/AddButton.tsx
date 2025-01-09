import { Pressable, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { BlurView } from 'expo-blur'
import { router } from 'expo-router'

const AddButton = () => {
  return ( 
    <View className='absolute right-0 bottom-20'>  
      <Pressable
        onPress={() => router.push('/trade-history/logtrade')}
      >
        <BlurView
          intensity={40}
          style={{
            flex: 1,
            marginHorizontal: 16,
            marginBottom: 16,
            padding: 8,
            borderRadius: 16,
            borderWidth: 2,
            overflow: 'hidden',
            borderColor: colors.green_2,
            backgroundColor: `${colors.green_2}B4`,
          }}
        >
          <MaterialCommunityIcons
            name='plus'
            size={28}
            color={colors.dark.neutral_8}
          />
        </BlurView>
      </Pressable>
    </View>
  )
}

export default AddButton