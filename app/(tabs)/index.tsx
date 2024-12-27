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
import { useCallback, useState } from 'react'
import { colors } from '@/constants/colors'
import { useFocusEffect } from 'expo-router'

const Index = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  
  // auto refreshes the screen when it's focused (when the user comes back to it)
  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );

  const drawdown = Array.from({ length: 28 }, () => (Math.random() * 2200 - 1000));

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
      
      <CalendarView drawdown={drawdown}/>
      <CurrentStreak />
      <WinPercentage />
      <TradeDuration />
      <RiskReward />
      <Drawdown drawdown={drawdown}/>
      <DailyReturns drawdown={drawdown}/>
      <View className='h-[80px] bg-dark-8' />
    </ScrollView>
  )
}

export default Index