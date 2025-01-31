import { Pressable, Text, View } from 'react-native'
import Separator from '@/components/Separator'
import GeneralOptions from '@/components/Profile/GeneralOptions'
import { useEffect, useState } from 'react'
import DeleteConfirmation from '@/components/Profile/DeleteConfirmation'
import { colors } from '@/constants/colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { router } from 'expo-router'
import { useUserSettings } from '@/hooks/useUserSettings'

const Profile = () => {
  const [showDelete, setShowDelete] = useState(false);
  const updateShowDelete = (value: boolean) => setShowDelete(value);
  
  const { setAccountId, accountId } = useUserSettings();
  useEffect(() => {
    if (accountId === 0) router.dismissTo('/');
  }, [accountId])

  return (
    <View className='flex-1 bg-dark-8 p-4'>
      {showDelete && <DeleteConfirmation showModal={showDelete} updateShowModal={updateShowDelete}/>}

      <GeneralOptions />
      <Separator margin='my-4'/>
      
      <Pressable
        className='flex-row items-center justify-left p-3 my-2 mt-3 mx-2 border rounded-lg border-dark-5 bg-dark-6/50 active:bg-dark-5'
        onPress={() => {
          setAccountId(0);
        }}
      >
        <MaterialCommunityIcons name='arrow-left-thick' size={18} color={colors.dark.neutral_1} style={{ paddingLeft: 4, paddingRight: 8}} />
        <Text className='text-dark-1 text-lg font-bold'>Accounts Page</Text>
      </Pressable>
      <Pressable
        className='flex-row items-center justify-left p-3 my-2 mt-3 mx-2 border rounded-lg border-accent-red bg-accent-red/50 active:bg-accent-red'
        onPress={() => {
          setShowDelete(true);
        }}
      >
        <MaterialCommunityIcons name='delete-forever' size={18} color={colors.dark.neutral_1} style={{ paddingLeft: 4, paddingRight: 8}} />
        <Text className='text-dark-1 text-lg font-bold'>Delete Account</Text>
      </Pressable>
    </View>
  );
}

export default Profile