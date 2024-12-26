import { FilterModalProps } from '@/constants/types'
import { useEffect, useMemo, useState } from 'react'
import { Text } from 'react-native'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { colors } from '@/constants/colors'
import Button from '../Button'
import DateTimeSelector from '../DateTimeSelector/DateTimeSelector'

const FilterModal = ({ bottomSheetRef, caption }: FilterModalProps) => {
  const snapPoints = useMemo(() => ['50%', '80%'], []);
  const [show, setShow] = useState(false);
  const updateShow = (value: boolean) => setShow(value);

  return (
    <BottomSheetModal
      enableDismissOnClose
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: colors.dark.neutral_7 }}
      handleIndicatorStyle={{ backgroundColor: colors.dark.neutral_3 }}
      onDismiss={() => {
        // TO-DO: UPDATE FILTERS
      }}
    >
      {/* TO-DO: UPDATE THE FILTERS AS STATE FROM 'useFilters.tsx' */}
      <BottomSheetView className='flex-1 px-4'>
        <Text className='font-medium text-2xl ml-2 text-dark-2 text-center'>{caption}</Text>

        <Text className='font-medium text-lg ml-2 text-dark-3'>Date:</Text>
        <Button text='2 September 2024 - 8 September 2024' buttonAction={() => updateShow(true)}/>
        <DateTimeSelector showModal={show} setShowModal={() => updateShow} onTimeChange={() => {}} initialTime={new Date().getTime()} title='Select Dates' mode='DateRange'/>
        {/* Starting Date + End Date (If no end date, go until current day) */}

        <Text className='font-medium text-lg ml-2 text-dark-3 mt-4'>Asset Traded:</Text>
        {/* Text Input */}

        <Text className='font-medium text-lg ml-2 text-dark-3 mt-4'>Asset Type:</Text>
        <Text className='font-medium text-lg ml-2 text-dark-3 mt-4'>Trade Rating:</Text>
        <Text className='font-medium text-lg ml-2 text-dark-3 mt-4'>Trade Outcome:</Text>
        <Text className='font-medium text-lg ml-2 text-dark-3 mt-4'>Trade Direction:</Text>
        <Text className='font-medium text-lg ml-2 text-dark-3 mt-4'>Time in Trade:</Text>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export default FilterModal