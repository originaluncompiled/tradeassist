import { View, Text, ScrollView, Keyboard } from 'react-native'
import GeneralInfo from '@/components/LogTrade/GeneralInfo'
import TradePerformance from '@/components/LogTrade/TradePerformance/TradePerformance'
import TradeTimes from '@/components/LogTrade/TradeTimes/TradeTimes'
import TradeInfo from '@/components/LogTrade/TradeInfo/TradeInfo'
import { initialTrade, tradeReducer } from '@/reducers/tradeReducer'
import { useEffect, useMemo, useReducer, useState } from 'react'
import { TradeContext } from '@/hooks/useTradeContext'
import LogTradeButton from '@/components/LogTrade/LogTradeButton'
import Separator from '@/components/Separator'
import NoteEditor from '@/components/LogTrade/NoteEditor/NoteEditor'
import { useLocalSearchParams } from 'expo-router'
import useDisplayDelete from '@/hooks/useDisplayDelete'
import DeleteConfirmation from '@/components/LogTrade/DeleteConfirmation'

const LogTrade = () => {
  // Prevents the 'Log Trade' button from being on top of the keyboard when it's is open
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
  Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

  // Get the trade's info that was sent from the trade history page's selected card
  const { trade } = useLocalSearchParams<{ trade: string }>();

  // Let's us know whether to log the trade, or to edit an existing one
  // useMemo so that it actually stays the same during each render and doesn't just switch each time
  const isEditingTrade = useMemo(() => {
    if (trade) {
      return true;
    } else {
      return false;
    }
  }, [trade])

  const [tradeState, dispatch] = useReducer(tradeReducer, trade ? JSON.parse(trade) : initialTrade);

  // Only show the 'Delete' button when we're actually editing a trade
  const { setShowDelete } = useDisplayDelete();
  useEffect(() => {
    if (isEditingTrade) {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  }, [isEditingTrade]);

  return (
    <TradeContext.Provider value={{tradeState, dispatch}}>
      <View className='flex-1 bg-dark-8'>
        <DeleteConfirmation />

        <ScrollView
          className='flex-grow px-4'
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          keyboardDismissMode='on-drag'
        >
          <Text className='font-bold text-xl text-dark-2'>
            {isEditingTrade ? `Editing ${new Date(tradeState.date).toLocaleDateString()} - ${tradeState.asset}` : 'New Trade'}
          </Text>

          <GeneralInfo />
          {/* <AssetTraded /> */}
          <TradePerformance />
          <TradeInfo />
          <TradeTimes />

          <Separator margin='mb-2'/>

          <NoteEditor />
        </ScrollView>
        {!keyboardVisible && <LogTradeButton isEditingTrade={isEditingTrade} />}
      </View>
    </TradeContext.Provider>
  )
}

export default LogTrade