import { colors } from '@/constants/colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { View, Image, Text, Pressable } from 'react-native'

const ProfileSection = () => {
  return (
    // TO-DO: Add section for seeing/editing assets
    // TO-DO: Add section for seeing which account youre on (name of it)
    <View className='flex-row mb-4'>
      <Image
        source={require('../../assets/images/profilePicturePlaceholder.jpg')}
        style={{width: 125, height: 150, borderRadius: 16}}
      />
      <View className='ml-4 flex-shrink justify-between'>
        <View>
          <Text className='text-3xl text-dark-1 font-bold'>Firstname Lastname</Text>
          <Text className='text-xl text-dark-2 font-medium'>temporary@gmail.com</Text>
        </View>

        <Pressable
          className='flex-row items-center'
          onPress={() => {
            // DO SOMETHING (Bring up a <Stack>/<BottomSheet> with account & security options)
          }}
        >
          <MaterialCommunityIcons name='square-edit-outline' size={24} color={colors.dark.neutral_3}/>
          <Text className='font-semibold text-md text-dark-3 active:underline ml-1'>Edit Account</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ProfileSection