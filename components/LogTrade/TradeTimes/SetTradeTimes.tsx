import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { colors } from '@/constants/colors'
import { SetTradeTimesProps } from '@/constants/types'

const SetTradeTimes = ({ text, updateTime, time }: SetTradeTimesProps) => {
  const [show, setShow] = useState(false);

  const getTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (minutes.toString().length === 1) {
      return `${hours}:0${minutes}`;
    } else {
      return `${hours}:${minutes}`;
    }
  }

  const onTimeChange = (event: DateTimePickerEvent, selectedTime: Date | undefined) => {
    updateTime(selectedTime ? selectedTime.getTime() : new Date().getTime());
    setShow(false);
  };

  return (
    <View className='flex-row justify-between items-center mb-2'>
      <Text className='text-dark-2 font-semibold text-lg'>{text}</Text>
      <Button buttonAction={() => setShow(true)} text={getTime(new Date(time))} />
      {show && (
        <DateTimePicker
          value={new Date(time)}
          onChange={(e, date) => onTimeChange(e, date)}
          mode='time'
          accentColor={`${colors.green_2}B4`}
        />
      )}
    </View>
  )
}

export default SetTradeTimes