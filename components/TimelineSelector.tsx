import { TimelineSelectorProps } from '@/constants/types';
import { Text, ScrollView, Pressable } from 'react-native'

const TimelineSelector = ({ changeTimeline, timeline }: TimelineSelectorProps) => {
  const timelineOptions: string[] = ['All Time', 'This Month', 'This Week', 'Today'];

  return (
    <ScrollView horizontal={true} className='mx-2' showsHorizontalScrollIndicator={false} overScrollMode='always'>
      { timelineOptions.map((option) => {
        return (
          <Pressable
            onPress={() => changeTimeline(option)}
            key={option}
            className='mx-2'
          >
            <Text className={`text-lg border px-5 py-2 rounded-2xl text-dark-1 border-dark-5 ${timeline === option ? `bg-dark-6` : 'transparent'}`}>
              {option}
            </Text>
          </Pressable>
        )
        }) }
    </ScrollView>
  )
}

export default TimelineSelector