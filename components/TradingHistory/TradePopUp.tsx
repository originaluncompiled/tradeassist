import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '@/constants/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TradePopUpProps } from '@/constants/types';
import { router } from 'expo-router';

const TradePopUp = ({ updateClicked }: TradePopUpProps) => {
  return (
      <View className='absolute right-0 bottom-36'>
        <BlurView
          intensity={40}
          style={{
            flex: 1,
            margin: 16,
            padding: 8,
            borderRadius: 16,
            borderWidth: 2,
            overflow: 'hidden',
            borderColor: colors.green_2,
            backgroundColor: `${colors.green_2}B4`,
          }} >
          <Pressable
            className='flex-row p-2 mb-2 pb-2 justify-center items-center bg-dark-1/10 rounded-lg'
            onPress={() => {
              updateClicked();
              router.push('/trade-history/taketrade');
            }} >
            <MaterialCommunityIcons name='play' size={22}/>
            <Text className='font-bold px-1 text-lg'>Take a Trade</Text>
          </Pressable>

          <Pressable
            className='flex-row p-2 pt-2 justify-center items-center bg-dark-1/10 rounded-lg'
            onPress={() => {
              updateClicked();
              router.push('/trade-history/logtrade')
            }} >
            <MaterialCommunityIcons name='upload' size={18}/>
            <Text className='font-bold px-2 text-lg'>Log a Trade</Text>
          </Pressable>
        </BlurView>
      </View>
  )
}

export default TradePopUp