import { View, Text, Pressable, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SetupStepProps } from '@/constants/types'
import { colors } from '@/constants/colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AssetCard from './AssetCard'
import { ScrollView } from 'react-native-gesture-handler'

const StepTwo = ({ updateAccountInfo, accountInfo }: SetupStepProps) => {
  // Prevents the add button from being above the keyboard when it's is open
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
  Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

  return (
    <View className='flex-1'>
      <Text className='text-dark-1 font-semibold text-2xl'>What Will You Be Trading?</Text>
      <Text className='text-dark-3 font-medium'>* You can skip this step and add them later</Text>
      
      <KeyboardAvoidingView className='flex-1 mt-5' behavior='padding'>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
          {
            accountInfo.assets.map((asset, index) => (
              <AssetCard key={index} id={index} updateAccountInfo={updateAccountInfo} accountInfo={accountInfo}/>
            ))
          }
        </ScrollView>
      </KeyboardAvoidingView>
      
      {!keyboardVisible &&
        <Pressable
          className='flex-row items-center justify-center p-3 mb-5 mt-5 border border-dashed rounded-lg border-dark-6 bg-dark-7/50 active:bg-dark-6/50'
          onPress={() => updateAccountInfo({ assets: [...accountInfo.assets, { assetName: '' }] }) }
        >
          <MaterialCommunityIcons name='plus-thick' size={18} color={colors.dark.neutral_3} style={{ paddingLeft: 4, paddingRight: 8}} />
          <Text className='text-dark-3 text-lg font-bold'>
            Add {accountInfo.market === 'Forex' ? 'Pair'
              : accountInfo.market === 'Futures' ? 'Contract'
              : accountInfo.market === 'Crypto' ? 'Coin'
              : 'Stock'}
          </Text>
        </Pressable>
      }
    </View>
  )
}

export default StepTwo