import { View, Text } from 'react-native'
import { useEffect } from 'react'
import { TradeOutcomeProps } from '@/constants/types';
import { useUserSettings } from '@/hooks/useUserSettings';

const TradeOutcome = ({ tradeState, handleInputChange }: TradeOutcomeProps) => {
  const { tradeOutcome, tradeReturn, risk } = tradeState;
  const { breakEvenBuffer } = useUserSettings();

  useEffect(() => {
    if (!risk) return;
    
    if (tradeReturn <= (risk * (breakEvenBuffer / 100)) && tradeReturn >= -(risk * (breakEvenBuffer / 100))) {
      handleInputChange('BREAK EVEN', 'TRADE_OUTCOME');
    } else if (tradeReturn > 0) {
      handleInputChange('WIN', 'TRADE_OUTCOME');
    } else {
      handleInputChange('LOSS', 'TRADE_OUTCOME');
    }
  }, [tradeReturn, risk])

  return (
    <View>
      {/* text-dark-2 (break even) / text-accent-green / text-accent-red */}
      <Text className={`${tradeOutcome === 'WIN' ? 'text-accent-green' : (tradeOutcome === 'LOSS' ? 'text-accent-red' : 'text-dark-3')} font-semibold text-lg`}>{tradeOutcome}</Text>
    </View>
  )
}

export default TradeOutcome