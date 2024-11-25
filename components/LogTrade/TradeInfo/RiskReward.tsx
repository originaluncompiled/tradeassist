import { View, Text } from 'react-native'
import { RiskRewardProps } from '@/constants/types'
import { useEffect, useState } from 'react'
import MoneyInput from './MoneyInput';

const RiskReward = ({ tradeState, handleInputChange }: RiskRewardProps) => {
  const { entry, exit, takeProfit, stopLoss, amountTraded, balanceChange, direction, target, risk } = tradeState;

  const [riskPercentage, setRiskPercentage] = useState(0);
  const [riskReward, setRiskReward] = useState(1);
  let newBalanceChange = '';

  useEffect(() => {
    let positionSize = 0;

    if (direction === 'Long') {
      positionSize = (exit - entry) * amountTraded;

    } else if (direction === 'Short') {
      positionSize = (entry - exit) * amountTraded;
    }
    //!!!!TO-DO: Replace 100k with actual user-inputted account balance
    newBalanceChange = ((100000 + positionSize - 100000) / 100000 * 100).toFixed(2);

    handleInputChange(Number(newBalanceChange), 'BALANCE_CHANGE');
  }, [direction, takeProfit, stopLoss, entry, exit, amountTraded, risk, target])

  // A separate useEffect, because sometimes there's a delay when the state gets changed ^ and then it uses old vlaues
  useEffect(() => {
    if (target === 0 || risk === 0) {
      setRiskReward(1);
    } else {
      setRiskReward(Number((target / risk).toFixed(2)));
    }
  }, [risk, target])

  useEffect(() => {
    //!!!!TO-DO: Replace 100k with actual user-inputted account balance
    setRiskPercentage(Number(((risk / 100000) * 100).toFixed(2)))
  }, [risk])

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
      
      {/* <View className='flex-row justify-between items-center'>
        <Text className='text-dark-2 font-semibold text-lg'>$ Target</Text>
        <Text
          className={`${target > 0 ? 'text-accent-green' : 'text-dark-1'} font-semibold text-lg w-32 text-center p-2`}
        >
          {target.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
        </Text>
      </View>

      <View className='flex-row justify-between items-center'>
        <Text className='text-dark-2 font-semibold text-lg'>$ Risk</Text>
        <Text
          className={`${risk > 0 ? 'text-accent-red' : 'text-dark-1'} font-semibold text-lg w-32 text-center p-2`}
        >
          {risk.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
        </Text>
      </View> */}

      <View className='flex-row justify-between items-center'>
        <Text className='text-dark-2 font-semibold text-lg'>% Risk</Text>
        <Text className='text-dark-1 font-semibold text-lg w-32 text-center p-2'>{`${riskPercentage}%`}</Text>
      </View>

      {/* TO-DO: MAKE MATH WORK WITH DIFFERENT ASSET TYPES */}
      {/* <View className='flex-row justify-between items-center'>
        <Text className='text-dark-2 font-semibold text-lg'>% Balance Change</Text>
        <Text className='text-dark-1 font-semibold text-lg w-32 text-center p-2'>{`${balanceChange}%`}</Text>
      </View> */}

      <View className='flex-row justify-between items-center'>
        <Text className='text-dark-2 font-semibold text-lg'>Risk : Reward</Text>
        <Text className='text-dark-1 font-semibold text-lg w-32 text-center p-2'>1 : {riskReward}</Text>
      </View>
    </View>
  )
}

export default RiskReward