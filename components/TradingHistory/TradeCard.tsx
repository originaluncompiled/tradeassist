import { Pressable, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { TradeCardProps } from '@/constants/types'

const TradeCard = ({ tradeInfo }: TradeCardProps) => {
  return (
    <View className='mx-4 mb-4'>
      <Pressable
        className='flex-1 rounded-2xl mx-[2px] border border-dark-6 px-4 pt-2 pb-4 active:bg-dark-6 bg-dark-7'
        onPress={() => {
          // FUNCTION
        }}
      >
        <View className='flex flex-row justify-between mb-2'>
          {/* Change this way of storing dates, it's dumb - just use "new Date" and turn it into a ShortDate */}
          {/* Trade Date + Asset */}
          <View className='flex-row items-center'>
            <Text className='text-dark-1 font-bold text-2xl'>
              {`${tradeInfo.date[0]}/${tradeInfo.date[1]}/${tradeInfo.date[2]}`}
            </Text>
            <Text className='text-dark-2 font-bold italic text-xl'>
              &nbsp;- {tradeInfo.asset}
            </Text>
          </View>
          <View className='flex flex-row items-center'>
            {/* Trade Rating */}
            <Text className='text-dark-1 font-bold text-xl'>
              {tradeInfo.rating}
            </Text>
            <MaterialCommunityIcons name='star' size={18} color={colors.dark.neutral_1} />
          </View>
        </View>
        
        <View className='flex-row justify-between items-center'>
          <View className='flex-row'>
            {/* $ Made/Lost */}
            <View
              className={`flex px-2 py-1 mr-2 rounded-lg ${tradeInfo.return > 0 ?
                  'bg-accent-green/50 border border-accent-green'
                  : 'bg-accent-red/50 border border-accent-red'}`}
              >
              <Text className='text-dark-1'>
                {tradeInfo.return.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </Text>
            </View>

            {/* Trade Direction */}
            <View
              className={`flex px-2 py-1 mr-2 rounded-lg
                ${tradeInfo.direction.toLowerCase() === 'short' ?
                'bg-blue-400/50 border border-blue-400'
                : 'bg-gray-600/50 border border-gray-600'}`}
            >
              <Text className='text-dark-1'>{tradeInfo.direction}</Text>
            </View>
          </View>

          {/* ROI */}
          <Text className={`font-bold text-lg ${tradeInfo.roi > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
            {(tradeInfo.roi > 0 ? '+' : '') + (tradeInfo.roi / 100).toLocaleString('en-US', { style: 'percent', maximumFractionDigits: 2 })}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default TradeCard