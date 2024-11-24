import { View } from 'react-native'
import TradeOutcome from './TradeOutcome'
import TradeRating from './TradeRating'
import TradeReturn from './TradeReturn'
import TradeDirection from './TradeDirection'
import { TradeAction } from '@/constants/types'
import { useTradeContext } from '@/hooks/useTradeContext'

const TradePerformance = () => {
  const { tradeState, dispatch } = useTradeContext();

  const handleInputChange = (
    input: number | string,
    dispatchAction: 'RATING' | 'TRADE_RETURN' | 'DIRECTION' | 'TRADE_RETURN'
  ) => {
    dispatch({
      type: dispatchAction,
      payload: input,
    } as TradeAction)
  }

  return (
    <View className='p-4 rounded-2xl my-2 mb-4 border border-dark-6 bg-dark-7'>
      <View className='flex-row justify-between'>
        <TradeOutcome tradeState={tradeState} handleInputChange={handleInputChange} />
        <TradeRating tradeState={tradeState} handleInputChange={handleInputChange} />
      </View>
      <TradeReturn tradeState={tradeState} handleInputChange={handleInputChange} />
      <TradeDirection tradeState={tradeState} handleInputChange={handleInputChange} />
    </View>
  )
}

export default TradePerformance