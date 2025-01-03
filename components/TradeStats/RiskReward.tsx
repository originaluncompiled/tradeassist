import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { TradeData } from '@/constants/types'

const RiskReward = ({ tradeData }: TradeData) => {
  const [riskRewardInfo, setRiskRewardInfo] = useState({ avgRiskReward: 0, highestRiskReward: 0, lowestRiskReward: 0 });

  const getRiskReward = useMemo(() => {
    let amountOfValidTrades = 0;
    const totalRiskReward = tradeData.reduce((total, trade) => {
      if (trade.target === 0 || trade.risk === 0) return total;

      // 'valid trades' are trades where there are both a target and a risk value
      amountOfValidTrades++;
      return total + (trade.target / trade.risk);
    }, 0); // in milliseconds
    // only calculate risk/reward where there are target and risk values
    const avgRiskReward = Number((totalRiskReward / amountOfValidTrades).toFixed(2));
    console.log(totalRiskReward, amountOfValidTrades, avgRiskReward);

    const riskRewardArray: number[] = [];
    tradeData.forEach((trade) => {
      const riskReward = trade.target / trade.risk;

      if (riskReward > 0) riskRewardArray.push(riskReward);
    });

    const longestTradeDuration = Math.max(...riskRewardArray).toString().includes('Infinity') ? 0 : Math.max(...riskRewardArray);
    const shortestTradeDuration = Math.max(...riskRewardArray).toString().includes('Infinity') ? 0 : Math.min(...riskRewardArray);

    return { avgRiskReward: avgRiskReward, highestRiskReward: longestTradeDuration, lowestRiskReward: shortestTradeDuration };
  }, [tradeData]);

  useEffect(() => {
    if (tradeData.length < 1) return;
    
    setRiskRewardInfo(getRiskReward);
  }, [getRiskReward]);

  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      <Text className='font-bold text-xl text-dark-2'>Risk/Reward</Text>

      <View className='flex-1 flex-row justify-between'>
        <View className='flex-1 items-start'>
          <Text className='font-medium text-lg text-dark-2'>Average</Text>
          <Text className='font-medium text-xl text-dark-1 px-5 py-3 bg-dark-6 rounded-full mt-2'>
            {isNaN(riskRewardInfo.avgRiskReward) ? '-' : `1: ${Number(riskRewardInfo.avgRiskReward.toFixed(2))}`}
          </Text>
        </View>

        <View className='justify-center pr-4'>
          <Text className='font-medium text-lg text-dark-2'>Highest <Text className='text-dark-1'>
          {isNaN(riskRewardInfo.highestRiskReward) ? '0 : 0' : `1: ${Number(riskRewardInfo.highestRiskReward.toFixed(2))}`}
          </Text></Text>
          <Text className='font-medium text-lg text-dark-2'>Lowest <Text className='text-dark-1'>
          {isNaN(riskRewardInfo.lowestRiskReward) ? '0 : 0' : `1: ${Number(riskRewardInfo.lowestRiskReward.toFixed(2))}`}
          </Text></Text>
        </View>
      </View>
    </View>
  )
}

export default RiskReward