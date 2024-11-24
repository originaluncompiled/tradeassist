import { View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { router } from 'expo-router'
import GeneralInfo from '@/components/LogTrade/GeneralInfo'
import TradePerformance from '@/components/LogTrade/TradePerformance/TradePerformance'
import TradeTimes from '@/components/LogTrade/TradeTimes/TradeTimes'
import TradeInfo from '@/components/LogTrade/TradeInfo/TradeInfo'
import { initialTrade, tradeReducer } from '@/reducers/tradeReducer'
import { useReducer } from 'react'
import { TradeContext } from '@/hooks/useTradeContext'
import LogTradeButton from '@/components/LogTrade/LogTradeButton'


const LogTrade = () => {
  const [tradeState, dispatch] = useReducer(tradeReducer, initialTrade);

  return (
    <TradeContext.Provider value={{tradeState, dispatch}}>
      <View className='flex-1 bg-dark-8'>
        <ScrollView  className='flex-grow px-4' keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
          {/* TO-DO: Make it say 'Edit ${date} - ${asset}' when you clicked on a trade card */}
          <Text className='font-bold text-xl text-dark-2'>New Trade</Text>

          <GeneralInfo />
          <TradePerformance />
          <TradeInfo />
          <TradeTimes />

          {/* TO-DO: Make button be fixed to the bottom of the screen, but disappear when you scroll down and then reappear when you scroll up OR are at the bottom of the screen */}
          <LogTradeButton />
        </ScrollView>
      </View>
    </TradeContext.Provider>
  )
}

export default LogTrade