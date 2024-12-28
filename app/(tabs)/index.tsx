import { ScrollView, View } from 'react-native'
import AccountOverview from '@/components/AccountOverview'
import CalendarView from '@/components/TradeStats/CalendarView'
import CurrentStreak from '@/components/TradeStats/CurrentStreak'
import WinPercentage from '@/components/TradeStats/WinRate'
import TradeDuration from '@/components/TradeStats/TradeDuration'
import RiskReward from '@/components/TradeStats/RiskReward'
import Drawdown from '@/components/TradeStats/Drawdown'
import DailyReturns from '@/components/TradeStats/DailyReturns'
import { RefreshControl } from 'react-native-gesture-handler'
import { useCallback, useEffect, useState } from 'react'
import { colors } from '@/constants/colors'
import { useFocusEffect } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { Trade } from '@/constants/types'

const Index = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const updateShowCalendarModal = (value: boolean) => {setShowCalendarModal(value); console.log('yahoooo')}

  // auto refreshes the screen when it's focused (when the user comes back to it)
  useFocusEffect(
    useCallback(() => {
      onRefresh();
      // sets showCalendarModal to false, if the user clicks on a <TradeCard /> (or the page get's unfocused)
      setShowCalendarModal(false);
    }, [])
  );

  const [tradeData, setTradeData] = useState<Trade[]>([]);

  const db = useSQLiteContext();
  const getTradeData = async () => {
    try {
      const result: Trade[] = await db.getAllAsync('SELECT id, date, asset, rating, tradeReturn, balanceChange, direction FROM trades ORDER BY date DESC');
      
      setTradeData(result);
    } catch (error) {
      console.log('Error fetching trade info: ', error);
    }
  }

  useEffect(() => {
    getTradeData();
  }, [, refreshing]);

  return (
    // TO-DO: Drag-To-Refresh (Same as on Trade History page)
    <ScrollView
      className='flex-1 bg-dark-8'
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.green_2]}
          progressBackgroundColor={colors.dark.neutral_6}
          tintColor={colors.green_2}
        />
      }
    >
      <AccountOverview />
      {/* TO-DO: Make this work
      <FilterSection filters={filters} updateFilters={updateFilters}/>
      */}
      
      <CalendarView tradeData={tradeData} showModal={showCalendarModal} updateShowModal={() => updateShowCalendarModal} />
      {/* <CurrentStreak tradeData={tradeData} />
      <WinPercentage tradeData={tradeData} />
      <TradeDuration tradeData={tradeData} />
      <RiskReward tradeData={tradeData} />
      <Drawdown tradeData={tradeData} />
      <DailyReturns tradeData={tradeData} /> */}
      <View className='h-[80px] bg-dark-8' />
    </ScrollView>
  )
}

export default Index