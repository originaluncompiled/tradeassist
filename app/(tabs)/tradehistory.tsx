import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, Text, View } from 'react-native'
import FilterSection from '@/components/Filter/FilterSection'
import TradeCard from '@/components/TradingHistory/TradeCard'
import { Trade } from '@/constants/types'
import AddButton from '@/components/TradingHistory/AddButton'
import { FlashList } from '@shopify/flash-list'
import { useSQLiteContext } from 'expo-sqlite'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { useFocusEffect } from 'expo-router'
import { useUserSettings } from '@/hooks/useUserSettings'

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
        // TO-DO: Memoize this for performance, and make it get called as little as possible
        let fetchedTradeHistory: Trade[] = await db.getAllAsync('SELECT id, date, asset, rating, tradeReturn, balanceChange, direction FROM trades WHERE accountId = ? ORDER BY date DESC', [accountId]);

        // If there was no change in the trade history/the database, then we don't need to cause a bunch of re-renders by updating the trade history
        if (JSON.stringify(fetchedTradeHistory) === JSON.stringify(tradeHistory)) {
          setRefreshing(false);
          return;
        };
        setTradeHistory(fetchedTradeHistory);
        setRefreshing(false);
      } catch (error) {
        console.log('Error fetching trade history: ', error);
      }
    }

    fetchTradeHistory();
  }, [refreshing])

  return (
    <>
      {/* TO-DO: Show a 'Load More' button at the bottom, so that you don't have to actually get everything and people's phones don't explode */}
      <View className='flex-1 bg-dark-8 pt-4 px-4'>
        {/* TO-DO: Make the filters work
        <FilterSection filters={filters} updateFilters={updateFilters}/>
        */}
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