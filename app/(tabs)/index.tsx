import { ScrollView, Text } from 'react-native'
import { useState } from 'react'
import AccountOverview from '@/components/AccountOverview'
import FilterSection from '@/components/Filter/FilterSection'

const Index = () => {
  const [filters, setFilters] = useState<string[]>([]);

  // TO-DO: Move to filter section and have other props for setting state and possible filters, etc.
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
    <ScrollView className='flex-1 bg-dark-8' showsVerticalScrollIndicator={false}>
      <AccountOverview timeline={'All Time'} />
      <FilterSection filters={filters} updateFilters={updateFilters}/>
      {/* <ChartCard {title as prop, etc.} /> */}
    </ScrollView>
  );
}

export default Index