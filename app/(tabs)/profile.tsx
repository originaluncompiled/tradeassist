import { View } from 'react-native'
import ProfileSection from '@/components/Profile/ProfileSection'
import Separator from '@/components/Separator'
import GeneralOptions from '@/components/Profile/GeneralOptions'
import ReminderDoc from '@/components/Profile/ReminderDoc'
import Strategies from '@/components/Profile/Strategies'

const Profile = () => {
  return (
    <View className='flex-1 bg-dark-8 p-4'>
      <ProfileSection />
      <Separator />
      
      <GeneralOptions />
      <Separator />
      
      <ReminderDoc />
      <Separator />
      <Strategies />
    </View>
  );
}

export default Profile