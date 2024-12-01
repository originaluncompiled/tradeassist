import { View, Text, ScrollView, Pressable } from 'react-native'
import { useCallback, useRef, useState } from 'react'
import FilterItem from './FilterItem'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { FilterSectionProps } from '@/constants/types'
import FilterModal from '../TradingHistory/FilterModal'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

const FilterSection = ({ filters, updateFilters }: FilterSectionProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  return (
    <View className='flex-row items-center justify-between mx-4 mb-2'>
      <FilterModal bottomSheetRef={bottomSheetRef}/>
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
        openBottomSheet();
      }}>
        <MaterialCommunityIcons name={filters.length === 0 ? 'filter-plus-outline' : 'filter-menu'} size={28} color={colors.dark.neutral_2} />
      </Pressable>
    </View>
  )
}

export default FilterSection