import { View, Text } from 'react-native'
import { useEffect } from 'react'
import { TradeOutcomeProps } from '@/constants/types';

const TradeOutcome = ({ tradeState, handleInputChange }: TradeOutcomeProps) => {
  const { tradeOutcome, tradeReturn } = tradeState;

  useEffect(() => {
    if (tradeReturn > 0) {
      handleInputChange('WIN', 'TRADE_OUTCOME');
    } else if (tradeReturn < 0) {
      handleInputChange('LOSS', 'TRADE_OUTCOME');
    } else {
      handleInputChange('BREAK EVEN', 'TRADE_OUTCOME');
    }
  }, [tradeReturn])

  return (
    <View>
      {/* text-dark-2 (break even) / text-accent-green / text-accent-red */}
      <Text className={`${tradeOutcome === 'WIN' ? 'text-accent-green' : (tradeOutcome === 'LOSS' ? 'text-accent-red' : 'text-dark-3')} font-semibold text-lg`}>{tradeOutcome}</Text>
    </View>
  )
}

export default TradeOutcome