import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { TradeData } from '@/constants/types'

const WinRate = ({ tradeData }: TradeData) => {
  const [winRateInfo, setWinRateInfo] = useState({ winRate: 0, profitFactor: 0, wins: 0, losses: 0, breakEvens: 0 });

  const getWinRateInfo = useMemo(() => {
    const wins = tradeData.filter((trade) => trade.tradeOutcome === 'WIN').length;
    const losses = tradeData.filter((trade) => trade.tradeOutcome === 'LOSS').length;
    const breakEvens = tradeData.filter((trade) => trade.tradeOutcome === 'BREAK EVEN').length;

    let winRate = Number(((wins / tradeData.length) * 100).toFixed(2));
    winRate = isNaN(winRate) ? 0 : winRate;

    const grossWins = tradeData.reduce((total, trade) => trade.tradeOutcome === 'WIN' ? total + trade.tradeReturn : total, 0);
    const grossLosses = tradeData.reduce((total, trade) => trade.tradeOutcome === 'LOSS' ? total + trade.tradeReturn : total, 0);
    const grossBreakEvens = tradeData.reduce((total, trade) => trade.tradeOutcome === 'BREAK EVEN' ? total + trade.tradeReturn : total, 0);

    let profitFactor = Number((grossWins / ((grossLosses * -1) + grossBreakEvens)).toFixed(2));
    profitFactor = isNaN(profitFactor) ? 0 : profitFactor;
    return { winRate: winRate, profitFactor: profitFactor, wins: wins, losses: losses, breakEvens: breakEvens };
  }, [tradeData]);

  useEffect(() => {
    setWinRateInfo(getWinRateInfo);
  }, [getWinRateInfo]);

  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      <Text className='font-bold text-xl text-dark-2'>Win Rate</Text>

      <View className='flex-1 justify-between'>
        <View className='flex-1 flex-row items-center justify-between'>
          <Text className='font-semibold text-xl text-dark-1 px-5 py-3 bg-dark-6 rounded-full mt-2'>{winRateInfo.winRate}%</Text>
          <Text className='font-semibold text-lg text-dark-1 pr-2'>{winRateInfo.profitFactor}x Profit Factor</Text>
        </View>

        <View className='flex-row mt-2 items-start'>
          <Text className='font-medium text-dark-1 px-3 py-1 mr-2 border border-accent-red bg-accent-red/60 rounded-2xl'>{winRateInfo.losses} Losses</Text>
          <Text className='font-medium text-dark-1 px-3 py-1 mr-2 border border-accent-green bg-accent-green/60 rounded-2xl'>{winRateInfo.wins} Wins</Text>
          <Text className='font-medium text-dark-1 px-3 py-1 border border-dark-4 bg-dark-4/60 rounded-2xl'>{winRateInfo.breakEvens} Break Evens</Text>
        </View>
      </View>
    </View>
  )
}

export default WinRate