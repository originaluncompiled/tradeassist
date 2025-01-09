import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import { SetTimeProps } from '@/constants/types'
import DateTimeSelector from '@/components/DateTimeSelector/DateTimeSelector'
import { useUserSettings } from '@/hooks/useUserSettings'

const SetTime = ({ text, updateTime, time, caption }: SetTimeProps) => {
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

    const time = `${(hours < 10) ? `0${hours}` : hours}:${(minutes < 10) ? `0${minutes}` : minutes}${is24Hour ? '' : partOfDay}`;

    return `${day} ${monthsArray[month]} - ${time}`;
  }

  const onTimeChange = (selectedTime: number) => {
    updateTime(selectedTime);
    setShow(false);
  };

  return (
    <View className={`flex-row justify-between items-center ${caption || caption === undefined && 'mb-2'}`}>
      {caption || caption === undefined && <Text className='text-dark-2 font-semibold text-lg'>{text}</Text>}
      <Button buttonAction={() => setShow(true)} text={getTime(new Date(time))} />
      <DateTimeSelector showModal={show} setShowModal={updateShow} onTimeChange={onTimeChange} initialTime={time} title={text} mode='DateTime' />
    </View>
  )
}

export default SetTime