import { View, Modal, Pressable, Text } from 'react-native'
import { DateTimeSelectorProps } from '@/constants/types'
import Button from '../Button'
import Scroller from './Scroller'
import { useState } from 'react'

const DateTimeSelector = ({ showModal, setShowModal, onTimeChange, initialTime, title }: DateTimeSelectorProps) => {
  const [timeFormat, setTimeFormat] = useState<'12hr' | '24hr'>('24hr');
  const [time, setTime] = useState<number>(new Date().getTime());
  const updateTime = (selectedTime: number) => setTime(selectedTime);

  return (
    <Modal visible={showModal} onRequestClose={() => setShowModal(false)} animationType='fade' transparent>
      <View className='flex-1 justify-center items-center'>
        <Pressable className='absolute w-full h-full bg-dark-8/40' onPress={() => setShowModal(false)}/>

        <View className='p-4 bg-dark-7 border-2 border-dark-6 rounded-2xl w-3/4'>
          <Text className='text-dark-1 font-medium text-xl mb-2 -mt-2 text-center'>{title}</Text>
          <Scroller updateTime={updateTime} initialTime={initialTime} />

          <View className='flex-row justify-between items-center mt-4'>
            <Pressable onPress={() => {
              setTimeFormat('12hr');
              // TO-DO: SOMEHOW GET DEVICE DEFAULT TIME FORMAT
            }}>
              <Text className='text-dark-1 font-medium text-lg ml-2'>{timeFormat}</Text>
            </Pressable>
            <View className='flex-row justify-end items-center'>
              <Button text='Cancel' buttonAction={() => setShowModal(false)} customClasses='mr-2 bg-dark-6'/>
              <Button text='Done' buttonAction={() => {
                onTimeChange(time);
                setShowModal(false);
              }}/>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default DateTimeSelector