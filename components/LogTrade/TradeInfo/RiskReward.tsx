import { View, Text } from 'react-native'
import { RiskRewardProps } from '@/constants/types'
import { useEffect, useState } from 'react'
import MoneyInput from './MoneyInput';
import { useUserSettings } from '@/hooks/useUserSettings';

const RiskReward = ({ tradeState, handleInputChange }: RiskRewardProps) => {
  const { startingBalance } = useUserSettings();
  const { entry, exit, amountTraded, balanceChange, direction, target, risk } = tradeState;

  const [riskReward, setRiskReward] = useState(1);
  let newBalanceChange = '';

  useEffect(() => {
    let positionSize = 0;

    if (direction === 'Long') {
      positionSize = (exit - entry) * amountTraded;
    } else if (direction === 'Short') {
      positionSize = (entry - exit) * amountTraded;
    }
    newBalanceChange = (positionSize / startingBalance * 100).toFixed(2);

    handleInputChange(Number(newBalanceChange), 'BALANCE_CHANGE');
  }, [direction, entry, exit, amountTraded])

  // A separate useEffect, because sometimes there's a delay when the state gets changed ^ and then it uses old vlaues
  useEffect(() => {
    if (target === 0 || risk === 0) {
      setRiskReward(1);
    } else {
      setRiskReward(Number((target / risk).toFixed(2)));
    }
  }, [risk, target])

  return (
    <View>
      <MoneyInput
        text='$ Target'
        initialValue={target}
        handleInputChange={handleInputChange}
        dispatchAction='TARGET'
      />
      <MoneyInput
        text='$ Risk'
        initialValue={risk}
        handleInputChange={handleInputChange}
        dispatchAction='RISK'
      />

      <View className='flex-row justify-between items-center'>
        <Text className='text-dark-2 font-semibold text-lg'>Risk : Reward</Text>
        <Text className='text-dark-1 font-semibold text-lg w-32 text-center p-2'>1 : {riskReward}</Text>
      </View>
    </View>
  )
}

export default RiskReward