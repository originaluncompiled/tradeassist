import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import { SetTradeTimesProps } from '@/constants/types'
import DateTimeSelector from '@/components/DateTimeSelector/DateTimeSelector'
import { useUserSettings } from '@/hooks/useUserSettings'

const SetTradeTimes = ({ text, updateTime, time }: SetTradeTimesProps) => {
  const [show, setShow] = useState(false);
  const updateShow = (value: boolean) => setShow(value);
  const { is24Hour } = useUserSettings();

  const getTime = (date: Date): string => {
    const day = date.getDate();
    const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = date.getMonth();
    let hours = date.getHours();
    const partOfDay = (!is24Hour && hours >= 12) ? ' PM' : ' AM';
    const minutes = date.getMinutes();

    if (!is24Hour && hours > 12) hours = hours - 12;

    let time: string;

    if (hours < 10) time = `0${hours}:${minutes}${is24Hour ? '' : partOfDay}`;
    else if (minutes < 10) time = `${hours}:0${minutes}${is24Hour ? '' : partOfDay}`;
    else time = `${hours}:${minutes}${is24Hour ? '' : partOfDay}`;

    return `${day} ${monthsArray[month]} - ${time}`;
  }

  const onTimeChange = (selectedTime: number) => {
    updateTime(selectedTime);
    setShow(false);
  };

  return (
    <View className='flex-row justify-between items-center mb-2'>
      <Text className='text-dark-2 font-semibold text-lg'>{text}</Text>
      {/* TO-DO: Make the text display based on if the 24 hour clock is being used */}
      <Button buttonAction={() => setShow(true)} text={getTime(new Date(time))} />
      <DateTimeSelector showModal={show} setShowModal={updateShow} onTimeChange={onTimeChange} initialTime={time} title={text} mode='DateTime' />
    </View>
  )
}

export default SetTradeTimes