import { View, Text, TextInput, Pressable, Platform } from 'react-native'
import React from 'react'
import { StepTwoProps } from '@/constants/types'
import { colors } from '@/constants/colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const AssetCard = ({ updateAccountInfo, accountInfo, id }: StepTwoProps) => {
  const createAssets = (text: string) => {
    const assets = [...accountInfo.assets];
    assets[id] = { assetName: text };
    updateAccountInfo({ assets });
  }

  return (
    <View className='flex-1 flex-row items-center mb-4'>
      <View className='flex-1 px-4 py-2 border rounded-lg border-dark-6 bg-dark-6/50 active:bg-dark-'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-dark-2 font-semibold text-lg'>
            {accountInfo.market === 'Forex' ? 'Pair'
              : accountInfo.market === 'Futures' ? 'Contract'
              : accountInfo.market === 'Crypto' ? 'Coin'
              : 'Stock'
            }:
          </Text>

          <TextInput
            className='w-1/2 text-lg text-center text-dark-1 border-b border-dark-3 px-2'
            value={accountInfo.assets[id].assetName}
            onChangeText={(text) => createAssets(text)}
            placeholder='Name'
            maxLength={10}
            placeholderTextColor={colors.dark.neutral_3}
            selectionColor={`${colors.green_2}B4`}
            scrollEnabled={false}
            multiline={Platform.OS === "ios" ? false : true}
            numberOfLines={1}
          />
        </View>        
      </View>

      <Pressable className='ml-4' hitSlop={16} onPress={() => updateAccountInfo({ assets: accountInfo.assets.filter((_, index) => index !== id) })}>
        <MaterialCommunityIcons name='delete' size={24} color={colors.dark.neutral_3} style={{ paddingLeft: 4, paddingRight: 8}} />
      </Pressable>
    </View>
  )
}

export default AssetCard