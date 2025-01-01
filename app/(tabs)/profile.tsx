import { View } from 'react-native'
import ProfileSection from '@/components/Profile/ProfileSection'
import Separator from '@/components/Separator'
import GeneralOptions from '@/components/Profile/GeneralOptions'

const Profile = () => {
  return (
    <View className='flex-1 bg-dark-8 p-4'>
      {/* <ProfileSection /> */}
      {/* <Separator /> */}
      
      {/* SECTION ABOUT OTHER ACCOUNTS (Not another TradeAssist account, but another trading account (for e.g. you could have one for your crypto trading and another for stocks trading)) */}

      <GeneralOptions />
      <Separator margin='my-4'/>
    </View>
  );
}

export default Profile