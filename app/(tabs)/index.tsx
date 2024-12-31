import { ScrollView, View } from 'react-native'
import AccountOverview from '@/components/AccountOverview'
import CalendarView from '@/components/TradeStats/Calendar/CalendarView'
import CurrentStreak from '@/components/TradeStats/CurrentStreak'
import WinPercentage from '@/components/TradeStats/WinRate'
import TradeDuration from '@/components/TradeStats/TradeDuration'
import RiskReward from '@/components/TradeStats/RiskReward'
import Drawdown from '@/components/TradeStats/Drawdown'
import DailyPnL from '@/components/TradeStats/DailyPnL'
import { RefreshControl } from 'react-native-gesture-handler'
import { useCallback, useEffect, useState } from 'react'
import { colors } from '@/constants/colors'
import { useFocusEffect } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { TradePage } from '@/constants/types'
import { TradeDataByDay, useStats } from '@/hooks/useStats'

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

  const [tradeData, setTradeData] = useState<TradePage[]>([]);

  const db = useSQLiteContext();
  const getTradeData = async () => {
    try {
      const result: TradePage[] = await db.getAllAsync('SELECT * FROM trades ORDER BY date DESC');
      
      setTradeData(result);
    } catch (error) {
      console.log('Error fetching trade info: ', error);
    }
  }

  useEffect(() => {
    getTradeData();
  }, [, refreshing]);

  const { setTradeDataByDay } = useStats();
  useEffect(() => {
    try {
      let calendarArray: TradeDataByDay = [];
      tradeData.map((trade) => {
        // if it's from a different month, then we don't need that trade
        if (new Date(trade.date).getMonth() !== new Date().getMonth()) return;
        // if the date already exists, add the trade to it, otherwise add a new object for that day
        if (calendarArray.find((day) => new Date(day.date.setHours(0, 0, 0, 0)).getTime() === new Date(trade.date).getTime())) {
          calendarArray[calendarArray.findIndex((day) => new Date(day.date.setHours(0, 0, 0, 0)).getTime() === new Date(trade.date).getTime())].trades.push(trade);
        } else {
          calendarArray.push({ date: new Date(trade.date), totalReturn: 0, outcome: 'BREAK EVEN', trades: [trade] });
        }
      })
  
      calendarArray.map((day) => {
        day.trades.map((trade) => {
          day.totalReturn += trade.tradeReturn;
        })
  
        if (day.totalReturn > 0) {
          day.outcome = 'WIN';
        } else if (day.totalReturn < 0) {
          day.outcome = 'LOSS';
        }
      })
  
      setTradeDataByDay(calendarArray.reverse());
    } catch (error) {
      console.log('Error sorting trade data by day: ', error);
      setTradeDataByDay([]);
    }
  }, [tradeData]);

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
      
      <CalendarView tradeData={tradeData} />
      {/* TRADEDATA IS USED TO CALUCLATE TRADESTREAK */}
      <CurrentStreak tradeData={tradeData} />
      <WinPercentage tradeData={tradeData} />
      <TradeDuration tradeData={tradeData} />
      <RiskReward tradeData={tradeData} />
      <Drawdown tradeData={tradeData} />
      <DailyPnL />
      <View className='h-[80px] bg-dark-8' />
    </ScrollView>
  )
}

export default Index