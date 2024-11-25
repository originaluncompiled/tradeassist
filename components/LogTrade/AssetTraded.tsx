import { View, ScrollView } from 'react-native'
import React from 'react'
import Button from '../Button'
import { useTradeContext } from '@/hooks/useTradeContext';
import { TradeAction } from '@/constants/types';

const AssetTraded = () => {
  const { tradeState, dispatch } = useTradeContext();
  const { assetType } = tradeState;

  const handleAssetChange = (payload: Extract<TradeAction, { type: 'ASSET_TYPE' }>['payload']) => {
    if (!payload) return;
    dispatch({
      type: 'ASSET_TYPE',
      payload: payload
    })
  }
  
  return (
    <View className='p-4 rounded-2xl my-2 border border-dark-6 bg-dark-7'>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} overScrollMode='always'>
        <Button
          text='Stocks'
          buttonAction={() => handleAssetChange('Stocks')}
          customClasses={`mr-2 ${assetType === 'Stocks' ? 'bg-dark-5' : 'bg-dark-6'}`}
        />
        <Button
          text='Futures'
          buttonAction={() => handleAssetChange('Futures')}
          customClasses={`mr-2 ${assetType === 'Futures' ? 'bg-dark-5' : 'bg-dark-6'}`}
        />
        <Button
          text='Forex'
          buttonAction={() => handleAssetChange('Forex')}
          customClasses={`mr-2 ${assetType === 'Forex' ? 'bg-dark-5' : 'bg-dark-6'}`}
        />
        <Button
          text='Crypto'
          buttonAction={() => handleAssetChange('Crypto')}
          customClasses={`mr-2 ${assetType === 'Crypto' ? 'bg-dark-5' : 'bg-dark-6'}`}
        />
        <Button
          text='Options'
          buttonAction={() => handleAssetChange('Options')}
          customClasses={assetType === 'Options' ? 'bg-dark-5' : 'bg-dark-6'}
        />
      </ScrollView>
    </View>
  )
}

export default AssetTraded