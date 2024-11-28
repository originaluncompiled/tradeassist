import { View, Text, ScrollView, Pressable } from 'react-native'
import { useRef, useState } from 'react'
import FilterItem from './FilterItem'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { FilterSectionProps } from '@/constants/types'
import FilterModal from '../TradingHistory/FilterModal'

const FilterSection = ({ filters, updateFilters }: FilterSectionProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const [showModal, setShowModal] = useState(false);
  const updateShowModal = (value: boolean) => setShowModal(value);

  return (
    <View className='flex-row items-center justify-between mx-4 mb-2'>
      {showModal && <FilterModal showModal={showModal} updateShowModal={updateShowModal}/> }
      {filters.length === 0 ?
        <Text className='font-bold text-lg ml-2 text-dark-2'>All Past Trades</Text>
        : 
        <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollViewRef}>
          {filters.map((filter, i) => {
            return <FilterItem filterText={filter} changeFilter={updateFilters} scrollViewRef={scrollViewRef} key={`${filter}${i}`}/>
          })}
        </ScrollView>
      }
      
      {/* Button to manage filters */}
      <Pressable className='p-2' onPress={() => {
        if (filters.length === 0) {
          updateFilters(['14 - 21 Oct','Wins','Losses','Break Even','Long','Short'], 'add', scrollViewRef);
        } else if (filters.length !== 0) {
          updateFilters('', 'clear');
        }
      }}>
        <MaterialCommunityIcons name={filters.length === 0 ? 'filter-plus-outline' : 'filter-remove'} size={28} color={colors.dark.neutral_2} />
      </Pressable>
    </View>
  )
}

export default FilterSection