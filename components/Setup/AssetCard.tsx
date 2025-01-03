import { View, Text, TextInput, Pressable, Platform } from 'react-native'
import React from 'react'
import { StepTwoProps } from '@/constants/types'
import { colors } from '@/constants/colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const AssetCard = ({ updateAccountInfo, accountInfo, id }: StepTwoProps) => {
  const createAssets = (text: string, action: 'name' | 'pip' | 'contract') => {
    const assets = [...accountInfo.assets];
    switch (action) {
      case 'name':
        assets[id] = { assetName: text, pipSize: accountInfo.assets[id].pipSize, contractSize: accountInfo.assets[id].contractSize };
        break;
      case 'pip':
        assets[id] = { assetName: accountInfo.assets[id].assetName, pipSize: text, contractSize: accountInfo.assets[id].contractSize };
        break;
      case 'contract':
        assets[id] = { assetName: accountInfo.assets[id].assetName, pipSize: accountInfo.assets[id].pipSize, contractSize: text };
        break;
    }
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
            onChangeText={(text) => createAssets(text, 'name')}
            placeholder='Name'
            placeholderTextColor={colors.dark.neutral_3}
            selectionColor={`${colors.green_2}B4`}
            scrollEnabled={false}
            multiline={Platform.OS === "ios" ? false : true}
            numberOfLines={1}
          />
        </View>

        {accountInfo.market === 'Forex' ? (
          <>
            <View className='flex-row items-center justify-between mt-2'>
              <Text className='text-dark-2 font-semibold text-lg'>Pip&nbsp;Size:</Text>
              <TextInput
                className='w-1/2 text-lg text-center text-dark-1 border-b border-dark-3 px-2'
                value={accountInfo.assets[id].pipSize}
                onChangeText={(text) => createAssets(text, 'pip')}
                placeholder='0.0001'
                inputMode='numeric'
                placeholderTextColor={colors.dark.neutral_3}
                selectionColor={`${colors.green_2}B4`}
                scrollEnabled={false}
                multiline={Platform.OS === "ios" ? false : true}
                numberOfLines={1}
              />
            </View>
            <Text className='font-medium text-dark-3 mt-2 mb-1'>* Search 'pip size' for this pair</Text>
          </>
        ) : accountInfo.market === 'Futures' && (
          <>
            <View className='flex-row items-center justify-between mt-2'>
              <Text className='text-dark-2 font-semibold text-lg'>Contract&nbsp;Size:</Text>
              <TextInput
                className='w-1/2 text-lg text-center text-dark-1 border-b border-dark-3 px-2'
                value={accountInfo.assets[id].contractSize}
                onChangeText={(text) => createAssets(text, 'contract')}
                placeholder='$50'
                inputMode='numeric'
                placeholderTextColor={colors.dark.neutral_3}
                selectionColor={`${colors.green_2}B4`}
                scrollEnabled={false}
                multiline={Platform.OS === "ios" ? false : true}
                numberOfLines={1}
              />
            </View>
            <Text className='font-medium text-dark-3 mt-2 mb-1'>* Search 'standard contract size' for this contract</Text>
          </>
        )}
        
      </View>
      <Pressable className='ml-4' hitSlop={16} onPress={() => updateAccountInfo({ assets: accountInfo.assets.filter((_, index) => index !== id) })}>
        <MaterialCommunityIcons name='delete' size={24} color={colors.dark.neutral_3} style={{ paddingLeft: 4, paddingRight: 8}} />
      </Pressable>
    </View>
  )
}

export default AssetCard