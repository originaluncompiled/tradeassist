import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import { SetTradeTimesProps } from '@/constants/types'
import DateTimeSelector from '@/components/DateTimeSelector/DateTimeSelector'

const SetTradeTimes = ({ text, updateTime, time }: SetTradeTimesProps) => {
  const [show, setShow] = useState(false);
  const updateShow = (value: boolean) => setShow(value);

  const getTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours < 10) return `0${hours}:${minutes}`;
    else if (minutes < 10) return `${hours}:0${minutes}`
    else return `${hours}:${minutes}`;
  }

  const onTimeChange = (selectedTime: number) => {
    updateTime(selectedTime);
    setShow(false);
  };

  return (
    <View className='flex-row justify-between items-center mb-2'>
      <Text className='text-dark-2 font-semibold text-lg'>{text}</Text>
      <Button buttonAction={() => setShow(true)} text={getTime(new Date(time))} />
      <DateTimeSelector showModal={show} setShowModal={updateShow} onTimeChange={onTimeChange} initialTime={time} title={text} />
      {/* {show && (
        <DateTimePicker
          value={new Date(time)}
          onChange={(e, date) => onTimeChange(e, date)}
          mode='time'
          accentColor={`${colors.green_2}B4`}
        />
      )} */}
    </View>
  )
}

export default SetTradeTimes