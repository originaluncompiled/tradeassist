import { View } from 'react-native'
import ProfileSection from '@/components/Profile/ProfileSection'
import Separator from '@/components/Separator';
import StartingBalance from '@/components/Profile/StartingBalance';

const Profile = () => {
  return (
    <View className='flex-1 bg-dark-8 p-4'>
      <ProfileSection />
      
      {/* NOT NOW */}
      {/* Add ability to rearrange them???
      <View className='bg-dark-7 border-2 border-dashed border-dark-5 rounded-2xl mt-4 px-1 gap-2'>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          // Make each one pressable, so that when you click on it, it tells you more about what it is/why you got it (using modals)
          <Badge badgeText='Liftoff!' color={'#dc2626'} emoji='🚀'/>
          <Badge badgeText='Leverage, Schmeverage' color={'#facc15'} emoji='💪'/>
          <Badge badgeText='Mindful Trader' color={'#ec4899'} emoji='🧠'/>
        </ScrollView>
      </View> */}
      <Separator />
      <StartingBalance />
      {/* <BreakEvenBuffer />
      <ThemeSelector />
      <Strategies /> */}
    </View>
  );
}

export default Profile