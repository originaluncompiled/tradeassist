import { Pressable, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { colors } from '@/constants/colors';
import { BlurView } from 'expo-blur';
import TradePopUp from './TradePopUp';
import { router } from 'expo-router';

const AddButton = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  const updateClicked = () => {
    setClicked(!clicked)
  }

  return (
    <>
    {/*   TO-DO: Decide whether to actually make this page or not */}
      {/* { clicked && <Pressable className='absolute w-full h-full' onPressIn={() => setClicked(false)}/> }
      { clicked && <TradePopUp updateClicked={updateClicked} /> } */}
      
      <View className='absolute right-0 bottom-20'>  
        <Pressable
          // onPress={updateClicked}
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
              name={clicked ? 'close' : 'plus'}
              size={28}
              color={clicked ? colors.dark.neutral_1 : colors.dark.neutral_8}
            />
          </BlurView>
        </Pressable>

      </View>
    </>
  )
}

export default AddButton