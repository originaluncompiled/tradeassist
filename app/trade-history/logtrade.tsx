import { View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { router } from 'expo-router'
import GeneralInfo from '@/components/LogTrade/GeneralInfo'
import TradePerformance from '@/components/LogTrade/TradePerformance/TradePerformance'
import TradeTimes from '@/components/LogTrade/TradeTimes/TradeTimes'
import TradeInfo from '@/components/LogTrade/TradeInfo/TradeInfo'
import { initialTrade, tradeReducer } from '@/reducers/tradeReducer'
import { useReducer } from 'react'
import { TradeContext } from '@/hooks/useTradeContext'


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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80}
            style={{ flex: 1 }}
          >
            <Pressable
              className='rounded-lg mb-4 bg-green-2/75 active:bg-green-2 border border-green-2'
              onPress={() => {
                router.navigate('/(tabs)/tradehistory')
              }}
            >
              <Text className='text-lg text-dark-7 font-bold text-center p-3'>Log Trade</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </TradeContext.Provider>
  )
}

export default LogTrade