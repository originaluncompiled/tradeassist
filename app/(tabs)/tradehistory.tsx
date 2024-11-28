import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import FilterSection from '@/components/Filter/FilterSection'
import TradeCard from '@/components/TradingHistory/TradeCard'
import { Trade } from '@/constants/types'
import AddButton from '@/components/TradingHistory/AddButton'
import { FlashList } from '@shopify/flash-list'
import { useSQLiteContext } from 'expo-sqlite'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'

const TradeHistory = () => {
  const db = useSQLiteContext();
  const [tradeHistory, setTradeHistory] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchTradeHistory = async () => {
      try {
        let fetchedTradeHistory: Trade[] = await db.getAllAsync('SELECT id, date, asset, rating, tradeReturn, balanceChange, direction FROM trades ORDER BY date DESC LIMIT 100');

        setTradeHistory(fetchedTradeHistory);
      } catch (error) {
        console.log('Error fetching trade history: ', error);
      }
    }

    fetchTradeHistory();
  }, [])

  const [filters, setFilters] = useState<string[]>([]);

  const updateFilters = (filter: string | string[], action: 'remove' | 'add' | 'clear', scrollViewRef?: React.RefObject<ScrollView>) => {
    let updatedFilters = [...filters];

    if (action === 'add') {
      if (Array.isArray(filter)) { // Add each item of the given array to the filters list
        filter.map((filterItem) => {
          updatedFilters.push(filterItem);
        })
      } else {
        updatedFilters.push(filter); // Adds the filter to current filters
      }
      setFilters(updatedFilters);
      // Scroll to the beginning after adding filters
      scrollViewRef?.current?.scrollTo({ x: 0, animated: true });
      // Scroll a bit to indicate to user that it can be scrolled
      setTimeout(() => {
        scrollViewRef?.current?.scrollTo({ x: 50, animated: true });
      }, 500);

    } else if (action === 'remove') {
      if (Array.isArray(filter)) {
        // I don't want to handle this
        throw new Error('Couldn\'t update filters. Filter was an array')
      } else {
        updatedFilters.splice(updatedFilters.indexOf(filter), 1); // Removes the filter from current filters
        // Get removed filter's index and if it's the 1st-3rd last item, scroll the view to remove any gaps from removing items
        const index = filters.findIndex(f => f === filter);
        if (index >= filters.length - 3) {
          scrollViewRef?.current?.scrollToEnd();
        }
      }
      setFilters(updatedFilters);
    } else if (action === 'clear') {
      setFilters([]);
    }
  }

  return (
    <>
      {/* TO-DO: Show a 'Load More' button at the bottom, so that you don't have to actually get everything and people's phones don't explode */}
      <View className='flex-1 bg-dark-8 pt-4'>
        <FilterSection filters={filters} updateFilters={updateFilters}/>
        {tradeHistory.length > 0 ?
          <FlashList
            data={tradeHistory}
            renderItem={({ item }) => <TradeCard tradeInfo={item} />}
            estimatedItemSize={98}
            contentContainerStyle={{ paddingBottom: 74 }}
            showsVerticalScrollIndicator={false}
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