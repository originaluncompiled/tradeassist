import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, Text, View } from 'react-native'
import TradeCard from '@/components/TradingHistory/TradeCard'
import { Trade } from '@/constants/types'
import AddButton from '@/components/TradingHistory/AddButton'
import { FlashList } from '@shopify/flash-list'
import { useSQLiteContext } from 'expo-sqlite'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { useFocusEffect } from 'expo-router'
import { useUserSettings } from '@/hooks/useUserSettings'
import { snakeToCamel } from '@/utils/mapSql'

const TradeHistory = () => {
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

  const db = useSQLiteContext();
  const [tradeHistory, setTradeHistory] = useState<Trade[]>([]);
  const { accountId } = useUserSettings();

  useEffect(() => {
    const fetchTradeHistory = async () => {
      try {
        let fetchedTradeHistory: Trade[] = await db.getAllAsync('SELECT id, date, asset, rating, trade_outcome, trade_return, balance_change, direction, entry_time FROM trades WHERE account_id = ? ORDER BY entry_time DESC', [accountId]);

        // If there was no change in the trade history/the database, then we don't need to cause a bunch of re-renders by updating the trade history
        if (JSON.stringify(snakeToCamel(fetchedTradeHistory)) === JSON.stringify(tradeHistory)) {
          setRefreshing(false);
          return;
        };
        setTradeHistory(snakeToCamel(fetchedTradeHistory));
        setRefreshing(false);
      } catch (error) {
        console.log('Error fetching trade history: ', error);
      }
    }

    fetchTradeHistory();
  }, [refreshing])

  return (
    <>
      <View className='flex-1 bg-dark-8 pt-4 px-4'>
        {tradeHistory.length > 0 ?
          <FlashList
            data={tradeHistory}
            renderItem={({ item }) => <TradeCard tradeInfo={item} />}
            estimatedItemSize={98}
            contentContainerStyle={{ paddingBottom: 74 }}
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
          />
          : <View className='flex-1 justify-center items-center mb-[100px]'>
              <Text className='text-dark-4 font-semibold text-2xl'>No Trades Found</Text>
              <Text className='text-dark-5 font-semibold text-lg'>Click + To Add Your First Trade!</Text>
              <MaterialCommunityIcons name='magnify' size={100} color={colors.dark.neutral_6} />
            </View>
        }
      </View>
      <AddButton />
    </>
  );
}

export default TradeHistory