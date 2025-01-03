import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { TradeData } from '@/constants/types';
import { useSQLiteContext } from 'expo-sqlite';
import { useUserSettings } from '@/hooks/useUserSettings';

const AccountOverview = ({ tradeData }: TradeData) => {
  const { startingBalance } = useUserSettings();

  const [pnl, setPnl] = useState(0);

  const calculatedPNL = useMemo(() => {
    const totalPnL = tradeData.reduce((total, trade) => trade.tradeReturn + total, 0);
    return totalPnL;
  }, [tradeData]);

  useEffect(() => {
    setPnl(calculatedPNL);
  }, [calculatedPNL]);

  return (
    <View className='px-3 py-2 border-2 rounded-2xl m-4 bg-green-2/75 border-green-2'>
      
      <Text className='text-lg text-dark-2'>Account Balance</Text>
      <Text className='font-bold text-5xl pt-1 text-dark-1'>
        {(startingBalance + pnl).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </Text>

      <View className='flex-row items-center justify-between pt-1'>
        <Text className='text-lg text-dark-2'>PnL</Text>
        <Text className={`font-bold text-2xl ${pnl > 0 ? 'text-accent-green' : pnl < 0 ? 'text-accent-red' : 'text-dark-1'}`}>
          {`${pnl > 0 ? '+' : pnl < 0 ? '-' : ''}${pnl.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
        </Text>
      </View>

    </View>
  )
}

export default AccountOverview