import { ScrollView } from 'react-native'
import { useState } from 'react'
import AccountOverview from '@/components/AccountOverview'
import TimelineSelector from '@/components/TimelineSelector'

const Index = () => {
  const [timeline, setTimeline] = useState('All Time');

  const changeTimeline = (option: string) => {
    setTimeline(option);
  };

  return (
    <ScrollView className='flex-1 bg-dark-8' showsVerticalScrollIndicator={false}>
      <AccountOverview timeline={timeline} />
      <TimelineSelector timeline={timeline} changeTimeline={changeTimeline} />

      {/* <ChartCard {title as prop, etc.} /> */}
    </ScrollView>
  );
}

export default Index