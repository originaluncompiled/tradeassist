import { FilterModalProps } from '@/constants/types'
import { useMemo } from 'react'
import { Text } from 'react-native'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { colors } from '@/constants/colors'
import Button from '../Button'

const FilterModal = ({ bottomSheetRef }: FilterModalProps) => {
  const snapPoints = useMemo(() => ['50%', '80%'], []);

  return (
    <BottomSheetModal
      enableDismissOnClose
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: colors.dark.neutral_7 }}
      handleIndicatorStyle={{ backgroundColor: colors.dark.neutral_3 }}
      onDismiss={() => {
        console.log('UPDATE FILTERS')
      }}
    >
      {/* UPDATE THE FILTERS AS STATE FROM 'useFilters.tsx' */}
      <BottomSheetView className='flex-1 px-4'>
        <Text className='font-medium text-2xl ml-2 text-dark-2 text-center'>Filter Trades By</Text>

        <Text className='font-medium text-lg ml-2 text-dark-3'>Date:</Text>
        <Button text='2 September 2024 - 8 September 2024' buttonAction={() => {}}/>
        {/* Starting Date + End Date (If no end date, go until current day) */}

        <Text className='font-medium text-lg ml-2 text-dark-3'>Asset Traded:</Text>
        {/* Text Input */}

        <Text className='font-medium text-lg ml-2 text-dark-3'>Asset Type:</Text>
        <Text className='font-medium text-lg ml-2 text-dark-3'>Trade Rating:</Text>
        <Text className='font-medium text-lg ml-2 text-dark-3'>Trade Outcome:</Text>
        <Text className='font-medium text-lg ml-2 text-dark-3'>Trade Direction:</Text>
        <Text className='font-medium text-lg ml-2 text-dark-3'>Time in Trade:</Text>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export default FilterModal