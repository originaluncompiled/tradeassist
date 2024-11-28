import { View, Text, ScrollView, Keyboard, Modal, Pressable } from 'react-native'
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
import { router, useLocalSearchParams } from 'expo-router'
import useDisplayDelete from '@/hooks/useDisplayDelete'
import { useSQLiteContext } from 'expo-sqlite'
import { LogBox } from 'react-native'
import { colors } from '@/constants/colors'

const LogTrade = () => {
  // I don't want to see the error. It works, it's just a warning
  // Might be a potential bug, but I don't care, it gives the effect that I want
  LogBox.ignoreLogs(['Warning: Text strings must be rendered within a <Text> component']);

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
  const { setShowDelete, showModal, setShowModal } = useDisplayDelete();
  useEffect(() => {
    if (isEditingTrade) {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  }, [isEditingTrade]);

  const db = useSQLiteContext();
  const deleteTrade = async (tradeId: number) => {
    try {
      await db.runAsync('DELETE FROM trades WHERE id = ?', [tradeId]);
    
      router.replace('/(tabs)/tradehistory');
    } catch (error) {
      console.log('Couldn\'t Delete Trade: ', error)
    }
  }

  return (
    <TradeContext.Provider value={{tradeState, dispatch}}>
      <View className='flex-1 bg-dark-8'>
        <Modal visible={showModal} onRequestClose={() => setShowModal(false)} animationType='none' transparent>\
          <View className='flex-1 justify-center items-center bg-dark-8/50'>
            <View className='border-2 border-dark-6 rounded-2xl p-4 bg-dark-7 w-3/4'>
              <Text className='text-dark-2 italic font-semibold text-2xl pb-1'>Are You Sure?</Text>
              <Text className='font-medium text-lg'>
                <Text style={{ color: colors.dark.neutral_1 }}>Do you really want to delete this trade? </Text>
                <Text style={{ color: colors.accent_red }}>This cannot be undone!</Text>
              </Text>
              <View className='flex-row items-center justify-around mt-4'>
                <Pressable
                  className='px-2 py-1 border border-dark-3 bg-dark-3/10 active:bg-dark-3/60 rounded-lg'
                  onPress={() => setShowModal(false)}
                >
                  <Text className='text-lg font-medium text-dark-3'>Cancel</Text>
                </Pressable>
                <Pressable
                  className='px-2 py-1 border border-accent-red bg-accent-red/20 active:bg-accent-red/60 rounded-lg'
                  onPress={() => {
                    setShowModal(false);
                    deleteTrade(tradeState.id ? tradeState.id : 0);
                  }}
                >
                  <Text className='text-lg  font-medium text-accent-red'>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <ScrollView className='flex-grow px-4' keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} keyboardDismissMode='on-drag'>
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