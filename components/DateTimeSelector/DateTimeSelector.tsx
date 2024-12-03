import { View, Modal, Pressable, Text } from 'react-native'
import { DateTimeSelectorProps } from '@/constants/types'
import Button from '../Button'
import Scroller from './Scroller'
import { useEffect, useState } from 'react'
import DateTimePicker from 'react-native-ui-datepicker'
import { colors } from '@/constants/colors'
import { useUserSettings } from '@/hooks/useUserSettings'

const DateTimeSelector = ({ showModal, setShowModal, onTimeChange, initialTime, title, mode }: DateTimeSelectorProps) => {
  const [time, setTime] = useState<number>(new Date().getTime());
  const updateTime = (selectedTime: number) => setTime(selectedTime);
  const [date, setDate] = useState(new Date(initialTime));

  const { is24Hour } = useUserSettings();
  // Only used when the user is using the 12 hour clock
  const [partOfDay, setPartOfDay] = useState<'AM' | 'PM'>('AM');
  const updatePartOfDay = (value: 'AM' | 'PM') => setPartOfDay(value);
  
  // an object so that I can keep track of the previous hours/minutes when one of them changes
  const [timeObj, setTimeObj] = useState({ hours: -1, minutes: -1 });
  const createTime = ({hours, minutes}: {hours?: number, minutes?: number}) => {
    const tempTime = {...timeObj};

    // when switching between AM/PM, this ensures that the hours update accordingly
    if (!is24Hour && hours !== undefined && hours >= 12 && partOfDay === 'AM') {
      hours = hours - 12;
    }

    if (hours !== undefined) {
      if (is24Hour || partOfDay === 'AM') {
        tempTime.hours = hours;
      } else if (partOfDay === 'PM') {
        tempTime.hours = hours + 12;
      }
    }
    if (minutes !== undefined) tempTime.minutes = minutes;

    setTimeObj(tempTime);

    // create the time value
    let d = new Date(date);
    d.setHours(tempTime.hours, tempTime.minutes, 0, 0);

    updateTime(new Date(d).getTime());
  }

  useEffect(() => {
    updateTime(new Date(date).getTime());
  }, [date])

  return (
    <Modal visible={showModal} onRequestClose={() => setShowModal(false)} animationType='fade' transparent>
      <View className='flex-1 justify-center items-center'>
        <Pressable className='absolute w-full h-full bg-dark-8/40' onPress={() => setShowModal(false)}/>

        <View className='p-4 bg-dark-7 border-2 border-dark-6 rounded-2xl w-4/5'>
          <Text className='text-dark-1 font-medium text-xl mb-2 -mt-2 text-center'>{title}</Text>
          {mode === 'DateTime' && <Scroller initialTime={initialTime} selectedDate={date} createTime={createTime} partOfDay={partOfDay} updatePartOfDay={updatePartOfDay} timeObj={timeObj} />}
          
          <DateTimePicker
            mode='single'
            date={date}
            onChange={({date}) => setDate(date as Date)}
            calendarTextStyle={{ color: colors.dark.neutral_2 }}
            selectedItemColor={ `${colors.green_2}B4` }
            headerTextStyle={{ color: colors.dark.neutral_3 }}
            headerButtonColor={ colors.dark.neutral_3 }
            dayContainerStyle={{ backgroundColor: colors.dark.neutral_6, borderColor: colors.dark.neutral_5, borderRadius: 8 }}
            weekDaysTextStyle={{ color: colors.dark.neutral_2 }}
            monthContainerStyle={{ backgroundColor: colors.dark.neutral_6, borderColor: colors.dark.neutral_5 }}
            yearContainerStyle={{ backgroundColor: colors.dark.neutral_6, borderColor: colors.dark.neutral_5 }}
          />

          <View className='flex-row justify-end items-center -mt-8'>
            <Button text='Cancel' buttonAction={() => setShowModal(false)} customClasses='mr-4 bg-dark-6'/>
            <Button text='Done' buttonAction={() => {
              onTimeChange(time);
              setShowModal(false);
            }}/>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default DateTimeSelector