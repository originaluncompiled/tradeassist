import { ScrollView, View } from 'react-native'
import AccountOverview from '@/components/TradeStats/AccountOverview'
import CalendarView from '@/components/TradeStats/Calendar/CalendarView'
import CurrentStreak from '@/components/TradeStats/CurrentStreak'
import WinRate from '@/components/TradeStats/WinRate'
import TradeDuration from '@/components/TradeStats/TradeDuration'
import RiskReward from '@/components/TradeStats/RiskReward'
import Drawdown from '@/components/TradeStats/Drawdown'
import DailyPnL from '@/components/TradeStats/DailyPnL'
import { RefreshControl } from 'react-native-gesture-handler'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { colors } from '@/constants/colors'
import { useFocusEffect } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { TradePage } from '@/constants/types'
import { TradeDataByDay, useStats } from '@/hooks/useStats'

const Stats = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  // auto refreshes the screen when it's focused (when the user comes back to it)
  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );

  const [tradeData, setTradeData] = useState<TradePage[]>([]);

  const db = useSQLiteContext();
  const fetchTradeData = async () => {
    try {
      const result: TradePage[] = await db.getAllAsync('SELECT * FROM trades ORDER BY date DESC');
      
      // If there was no change in the trade data/database, then we don't need to cause a bunch of re-renders by updating tradeData
      if (JSON.stringify(result) === JSON.stringify(tradeData)) {
        setRefreshing(false);
        return;
      };
      setTradeData(result);
      setRefreshing(false);
    } catch (error) {
      console.log('Error fetching trade info: ', error);
    }
  };

  useEffect(() => {
    fetchTradeData();
  }, [refreshing]);

  const { setTradeDataByDay } = useStats();
  const sortedTradeDataByDay = useMemo(() => {
    try {
      let calendarArray: TradeDataByDay = [];

      tradeData.forEach((trade) => {
        // if the date already exists, add the trade to it, otherwise add a new object for that day
        if (calendarArray.find((day) => new Date(new Date(day.date).setHours(0, 0, 0, 0)).getTime() === new Date(trade.date).getTime())) {
          calendarArray[calendarArray.findIndex((day) => new Date(new Date(day.date).setHours(0, 0, 0, 0)).getTime() === new Date(trade.date).getTime())].trades.push(trade);
        } else {
          calendarArray.push({ date: `${trade.date}`, totalReturn: 0, outcome: 'BREAK EVEN', trades: [trade] });
        }
      })
  
      calendarArray.forEach((day) => {
        day.trades.forEach((trade) => {
          day.totalReturn += trade.tradeReturn;
        })
  
        if (day.totalReturn > 0) {
          day.outcome = 'WIN';
        } else if (day.totalReturn < 0) {
          day.outcome = 'LOSS';
        }
      })

      return calendarArray.toReversed();
    } catch (error) {
      console.log('Error sorting trade data by day: ', error);
      return [];
    }
  }, [tradeData]);

  const updateTradeDataByDay = useCallback((data: TradeDataByDay | undefined) => {
    if (!data) return;
    setTradeDataByDay(data);
  }, []);

  useEffect(() => {
    updateTradeDataByDay(sortedTradeDataByDay);
  }, [sortedTradeDataByDay]);

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
      <CurrentStreak tradeData={tradeData} />
      <WinRate tradeData={tradeData} />
      <TradeDuration tradeData={tradeData} />
      <RiskReward tradeData={tradeData} />
      <Drawdown tradeData={tradeData} />
      <DailyPnL />
      <View className='h-[80px] bg-dark-8' />
    </ScrollView>
  )
}

export default Stats