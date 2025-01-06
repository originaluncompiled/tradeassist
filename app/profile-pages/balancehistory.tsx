import { View, Text, KeyboardAvoidingView, ScrollView, Keyboard, Pressable } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '@/constants/colors';
import { useUserSettings } from '@/hooks/useUserSettings';

const balancehistory = () => {
  // Prevents the add button from being above the keyboard when it's is open
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
  Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

  const { market } = useUserSettings();

  return (
    <View className='flex-1 bg-dark-8 px-8'>
      <KeyboardAvoidingView className='flex-1 mt-5' behavior='padding'>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
          {
            // assets.map((asset, index) => (
            //   <AssetCard key={index} accountId={accountId} id={index} market={market} assets={assets} updateAssets={updateAssets} />
            // ))
          }
        </ScrollView>
      </KeyboardAvoidingView>
      
      {!keyboardVisible &&
        <View>
          <Pressable
            className='flex-row items-center justify-center p-3 mb-5 mt-5 border border-dashed rounded-lg border-dark-6 bg-dark-7/50 active:bg-dark-6/50'
            // onPress={() => updateAssets([...assets, { accountId: accountId, assetName: '' } ]) }
          >
            <MaterialCommunityIcons name='plus-thick' size={18} color={colors.dark.neutral_3} style={{ paddingLeft: 4, paddingRight: 8}} />
            <Text className='text-dark-3 text-lg font-bold'>
              Add {market === 'Forex' ? 'Pair'
                : market === 'Futures' ? 'Contract'
                : market === 'Crypto' ? 'Coin'
                : 'Stock'}
            </Text>
          </Pressable>
          
          {/* <EditAssetsButton assets={assets} /> */}
        </View>
      }
    </View>
  )
}

export default balancehistory