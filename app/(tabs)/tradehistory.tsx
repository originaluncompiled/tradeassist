import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import FilterSection from '@/components/Filter/FilterSection'
import TradeCard from '@/components/TradingHistory/TradeCard'
import { Trade } from '@/constants/types'
import AddButton from '@/components/TradingHistory/AddButton'

const TradeHistory = () => {
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
      scrollViewRef?.current?.scrollTo({ x: 0, animated: false });
      // Scroll right a bit to indicate to user that it can be scrolled
      setTimeout(() => {
        scrollViewRef?.current?.scrollTo({ x: 50 });
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

  // PLACEHOLDER DATA, REMOVE LATER
  const tradeHistory: Trade[] = [
    {
      "date": [28, 3, 2022],
      "asset": "EURUSD",
      "rating": 4,
      "return": 1500.75,
      "roi": 0.02,
      "direction": "Long"
    },
    {
      "date": [29, 3, 2022],
      "asset": "AAPL",
      "rating": 5,
      "return": 3200.00,
      "roi": 0.05,
      "direction": "Short"
    },
    {
      "date": [30, 3, 2022],
      "asset": "BTCUSD",
      "rating": 3,
      "return": 1200.50,
      "roi": 0.01,
      "direction": "Long"
    },
    {
      "date": [31, 3, 2022],
      "asset": "TSLA",
      "rating": 4,
      "return": -2500.00,
      "roi": -0.04,
      "direction": "Short"
    },
    {
      "date": [1, 4, 2022],
      "asset": "GOLD",
      "rating": 5,
      "return": 4000.25,
      "roi": 0.06,
      "direction": "Long"
    },
    {
      "date": [2, 4, 2022],
      "asset": "USDJPY",
      "rating": 2,
      "return": -500.00,
      "roi": -0.01,
      "direction": "Short"
    },
    {
      "date": [3, 4, 2022],
      "asset": "NGAS",
      "rating": 3,
      "return": 750.00,
      "roi": 0.02,
      "direction": "Long"
    },
    {
      "date": [4, 4, 2022],
      "asset": "MSFT",
      "rating": 4,
      "return": 1800.30,
      "roi": 0.03,
      "direction": "Short"
    },
    {
      "date": [5, 4, 2022],
      "asset": "LTCUSD",
      "rating": 5,
      "return": 1500.00,
      "roi": 0.04,
      "direction": "Long"
    },
    {
      "date": [6, 4, 2022],
      "asset": "FTSE100",
      "rating": 4,
      "return": 2000.80,
      "roi": 0.03,
      "direction": "Short"
    },
    {
      "date": [7, 4, 2022],
      "asset": "AUDCAD",
      "rating": 2,
      "return": -300.00,
      "roi": -0.01,
      "direction": "Long"
    },
    {
      "date": [8, 4, 2022],
      "asset": "S&P 500",
      "rating": 5,
      "return": 5000.00,
      "roi": 0.07,
      "direction": "Short"
    }
  ]

  return (
    <>
      <ScrollView className='flex-1 bg-dark-8' showsVerticalScrollIndicator={false}>
        <FilterSection filters={filters} updateFilters={updateFilters} />
        {/* USE FLASHLIST/FLATLIST */}
        {/* Make last TradeCard have enough bottom padding to not be obstructed by navbar */}
        <View className='mb-[74px]'>
          {tradeHistory.map((trade) => {
            return <TradeCard tradeInfo={trade} key={`${Math.random()}`}/>
          })}
        </View>
      </ScrollView>

      <AddButton />
    </>
  );
}

export default TradeHistory