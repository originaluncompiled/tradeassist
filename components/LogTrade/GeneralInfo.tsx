import { TextInput, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Button from '../Button'
import { colors } from '@/constants/colors'

const GeneralInfo = () => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const showDatePicker = () => {
    setShow(true)
  }

  const onDateChange = (event: DateTimePickerEvent, date: Date | undefined) => {
    const selectedDate = date || new Date;

    setDate(selectedDate);
    setShow(false);
  };

  return (
    <View className='p-4 rounded-2xl my-2 border border-dark-6 bg-dark-7'>
      <View className='flex-row justify-between'>
        <Button text={date.toLocaleDateString()} buttonAction={() => showDatePicker()}/>
        {show && (
          <DateTimePicker
            value={date}
            onChange={onDateChange}
            mode='date'
            accentColor={`${colors.green_2}B4`}
          />
        )}
          <TextInput
            placeholder='Asset'
            placeholderTextColor={colors.dark.neutral_3}
            className='text-dark-1 font-bold text-lg border-b border-dark-3 px-2 w-32 h-12'
            maxLength={8}
            textAlign='center'
          />
      </View>
    </View>
  )
}

export default GeneralInfo