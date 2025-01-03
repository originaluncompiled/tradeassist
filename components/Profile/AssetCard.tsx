import { View, Text, TextInput, Platform, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '@/constants/colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { AssetCardProps } from '@/constants/types'

const AssetCard = ({ id, market, assets, updateAssets, accountId }: AssetCardProps) => {
  const createAssets = (text: string, action: 'name' | 'pip' | 'contract') => {
    const newAssets = [...assets];
    switch (action) {
      case 'name':
        newAssets[id] = { accountId, assetName: text, pipSize: assets[id].pipSize, contractSize: assets[id].contractSize };
        break;
      case 'pip':
        newAssets[id] = { accountId, assetName: assets[id].assetName, pipSize: text, contractSize: assets[id].contractSize };
        break;
      case 'contract':
        newAssets[id] = { accountId, assetName: assets[id].assetName, pipSize: assets[id].pipSize, contractSize: text };
        break;
    }
    updateAssets(newAssets);
  }

  return (
    <View className='flex-1 flex-row items-center mb-4'>
      <View className='flex-1 px-4 py-2 border rounded-lg border-dark-6 bg-dark-6/50 active:bg-dark-'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-dark-2 font-semibold text-lg'>
            {market === 'Forex' ? 'Pair'
              : market === 'Futures' ? 'Contract'
              : market === 'Crypto' ? 'Coin'
              : 'Stock'
            }:
          </Text>
          <TextInput
            className='w-1/2 text-lg text-center text-dark-1 border-b border-dark-3 px-2'
            value={assets[id].assetName}
            onChangeText={(text) => createAssets(text, 'name')}
            placeholder='Name'
            placeholderTextColor={colors.dark.neutral_3}
            selectionColor={`${colors.green_2}B4`}
            scrollEnabled={false}
            multiline={Platform.OS === "ios" ? false : true}
            numberOfLines={1}
          />
        </View>

        {market === 'Forex' ? (
          <>
            <View className='flex-row items-center justify-between mt-2'>
              <Text className='text-dark-2 font-semibold text-lg'>Pip&nbsp;Size:</Text>
              <TextInput
                className='w-1/2 text-lg text-center text-dark-1 border-b border-dark-3 px-2'
                value={assets[id].pipSize?.toString()}
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
        ) : market === 'Futures' && (
          <>
            <View className='flex-row items-center justify-between mt-2'>
              <Text className='text-dark-2 font-semibold text-lg'>Contract&nbsp;Size:</Text>
              <TextInput
                className='w-1/2 text-lg text-center text-dark-1 border-b border-dark-3 px-2'
                value={assets[id].contractSize?.toString()}
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
      <Pressable className='ml-4' hitSlop={16} onPress={() => updateAssets(assets.filter((_, index) => index !== id))}>
        <MaterialCommunityIcons name='delete' size={24} color={colors.dark.neutral_3} style={{ paddingLeft: 4, paddingRight: 8}} />
      </Pressable>
    </View>
  )
}

export default AssetCard