import { ScrollView, View } from 'react-native'
import AccountOverview from '@/components/AccountOverview'
import CalendarView from '@/components/TradeStats/CalendarView'
import CurrentStreak from '@/components/TradeStats/CurrentStreak'
import WinPercentage from '@/components/TradeStats/WinPercentage'
import TradeDuration from '@/components/TradeStats/TradeDuration'
import RiskReward from '@/components/TradeStats/RiskReward'
import Drawdown from '@/components/TradeStats/Drawdown'
import DailyReturns from '@/components/TradeStats/DailyReturns'

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
      <Drawdown />
      <DailyReturns />
      <View className='h-[80px] bg-dark-8' />
    </ScrollView>
  )
}

export default Index