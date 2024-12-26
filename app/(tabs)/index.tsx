import { ScrollView } from 'react-native'
import AccountOverview from '@/components/AccountOverview'
import CalendarView from '@/components/TradeStats/CalendarView'
import CurrentStreak from '@/components/TradeStats/CurrentStreak';
import WinPercentage from '@/components/TradeStats/WinPercentage';
import TradeDuration from '@/components/TradeStats/TradeDuration';
import RiskReward from '@/components/TradeStats/RiskReward';

const Index = () => {
  return (
    // TO-DO: Drag-To-Refresh (Same as on Trade History page)
    <ScrollView className='flex-1 bg-dark-8' showsVerticalScrollIndicator={false}>
      <AccountOverview timeline={'All Time'} />
      {/* TO-DO: Make this work
      <FilterSection filters={filters} updateFilters={updateFilters}/>
      */}
      
      <CalendarView />
      <CurrentStreak />
      <WinPercentage />
      <TradeDuration />
      <RiskReward />
    </ScrollView>
  );
}

export default Index