import { View, Text, ScrollView, Keyboard } from 'react-native'
import GeneralInfo from '@/components/LogTrade/GeneralInfo'
import TradePerformance from '@/components/LogTrade/TradePerformance/TradePerformance'
import TradeTimes from '@/components/LogTrade/TradeTimes/TradeTimes'
import TradeInfo from '@/components/LogTrade/TradeInfo/TradeInfo'
import { initialTrade, tradeReducer } from '@/reducers/tradeReducer'
import { useReducer, useState } from 'react'
import { TradeContext } from '@/hooks/useTradeContext'
import LogTradeButton from '@/components/LogTrade/LogTradeButton'
import Separator from '@/components/Separator'
import NoteEditor from '@/components/LogTrade/NoteEditor/NoteEditor'

const LogTrade = () => {
  // Prevents the 'Log Trade' button from being on top of the keyboard when it's is open
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
  Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

  // TO-DO: Check if the user clicked on a card in the trade history page (for e.g. the request came with a trade id or smthn)
  // If so, get the trade info from the trade history page and create a new trade object
  // Else just use initialTrade
  const [tradeState, dispatch] = useReducer(tradeReducer, initialTrade);

  return (
    <TradeContext.Provider value={{tradeState, dispatch}}>
      <View className='flex-1 bg-dark-8'>
        <ScrollView className='flex-grow px-4' keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} keyboardDismissMode='on-drag'>
          {/* TO-DO: Make it say 'Edit ${date} - ${asset}' when you clicked on a trade card */}
          <Text className='font-bold text-xl text-dark-2'>New Trade</Text>

          <GeneralInfo />
          {/* <AssetTraded /> */}
          <TradePerformance />
          <TradeInfo />
          <TradeTimes />

          <Separator margin='mb-2'/>

          <NoteEditor />
          {/* TO-DO: Make button be fixed to the bottom of the screen, but disappear when you scroll down and then reappear when you scroll up OR are at the bottom of the screen */}
        </ScrollView>
        {!keyboardVisible && <LogTradeButton/>}
      </View>
    </TradeContext.Provider>
  )
}

export default LogTrade