import { View, Text } from 'react-native'
import { RiskRewardProps } from '@/constants/types'
import { useEffect, useState } from 'react'

const RiskReward = ({ tradeState, handleInputChange }: RiskRewardProps) => {
  const { entry, exit, takeProfit, stopLoss, amountTraded, balanceChange, direction } = tradeState;

  const [target, setTarget] = useState(0);
  const [risk, setRisk] = useState(0);
  const [riskPercentage, setRiskPercentage] = useState(0);
  const [riskReward, setRiskReward] = useState(1);
  let newBalanceChange = '';

  useEffect(() => {
    if (direction === 'Long') {
      setTarget((takeProfit - entry) * amountTraded);
      setRisk((entry - stopLoss) * amountTraded);
      //!!!!TO-DO: Replace 100k with actual user-inputted account balance
      newBalanceChange = (((100000 + (exit - entry) * amountTraded) - 100000) / 100000 * 100).toFixed(2);
    } else if (direction === 'Short') {
      setTarget((entry - takeProfit) * amountTraded);
      setRisk((stopLoss - entry) * amountTraded);
      //!!!!TO-DO: Replace 100k with actual user-inputted account balance
      newBalanceChange = (((100000 + (entry - exit) * amountTraded) - 100000) / 100000 * 100).toFixed(2);
    }

    handleInputChange(Number(newBalanceChange), 'BALANCE_CHANGE');
  }, [direction, takeProfit, stopLoss, entry, exit, amountTraded])

  // A separate useEffect, because sometimes there's a delay when the state gets changed ^ and then it uses old vlaues
  useEffect(() => {
    setRiskReward(Number((target / risk).toFixed(2)));
  }, [risk, target])

  useEffect(() => {
    //!!!!TO-DO: Replace 100k with actual user-inputted account balance
    setRiskPercentage(Number(((risk / 100000) * 100).toFixed(2)))
  }, [risk])

  return (
    <View>
      <View className='flex-row justify-between items-center'>
        <Text className='text-dark-2 font-semibold text-lg'>$ Target</Text>
        <Text className='text-accent-green font-semibold text-lg w-32 text-center p-2'>{target.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</Text>
      </View>

      <View className='flex-row justify-between items-center'>
        <Text className='text-dark-2 font-semibold text-lg'>$ Risk</Text>
        <Text className='text-accent-red font-semibold text-lg w-32 text-center p-2'>{risk.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</Text>
      </View>

      <View className='flex-row justify-between items-center'>
        <Text className='text-dark-2 font-semibold text-lg'>% Risk</Text>
        <Text className='text-dark-1 font-semibold text-lg w-32 text-center p-2'>{`${riskPercentage}%`}</Text>
      </View>

      <View className='flex-row justify-between items-center'>
        <Text className='text-dark-2 font-semibold text-lg'>% Balance Change</Text>
        <Text className='text-dark-1 font-semibold text-lg w-32 text-center p-2'>{`${balanceChange}%`}</Text>
      </View>

      <View className='flex-row justify-between items-center'>
        <Text className='text-dark-2 font-semibold text-lg'>Risk : Reward</Text>
        <Text className='text-dark-1 font-semibold text-lg w-32 text-center p-2'>1 : {riskReward}</Text>
      </View>
    </View>
  )
}

export default RiskReward