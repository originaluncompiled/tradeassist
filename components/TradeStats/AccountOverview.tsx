import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { TradeData } from '@/constants/types';
import { useSQLiteContext } from 'expo-sqlite';
import { useUserSettings } from '@/hooks/useUserSettings';

const AccountOverview = ({ tradeData }: TradeData) => {
  const { accountId } = useUserSettings();

  const [accountBalance, setAccountBalance] = useState({ accountBalance: 0, pnl: 0 });

  const db = useSQLiteContext();
  const fetchStartingBalance = async () => {
    try {
      const result: { startingBalance: number }[] = await db.getAllAsync('SELECT startingBalance FROM accounts WHERE id = ?', [accountId]);
      
      // If there was no change in the starting account balance then we don't need to cause a bunch of re-renders by updating it
      if (JSON.stringify(result) === JSON.stringify(accountBalance)) return;
      return result[0].startingBalance;
    } catch (error) {
      console.log('Error fetching starting balance: ', error);
    }
  };

  const calculatePNL = useMemo(() => {
    const totalPnL = tradeData.reduce((total, trade) => trade.tradeReturn + total, 0);
    return totalPnL;
  }, [tradeData]);

  useEffect(() => {
    fetchStartingBalance()
      .then((startingBalance) => {
        if (!startingBalance) return;
        setAccountBalance({ accountBalance: startingBalance + calculatePNL, pnl: calculatePNL });
      })
  }, [calculatePNL]);

  return (
    <View className='px-3 py-2 border-2 rounded-2xl m-4 bg-green-2/75 border-green-2'>
      
      <Text className='text-lg text-dark-2'>Account Balance</Text>
      <Text className='font-bold text-5xl pt-1 text-dark-1'>
        {accountBalance.accountBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </Text>

      <View className='flex-row items-center justify-between pt-1'>
        <Text className='text-lg text-dark-2'>PnL</Text>
        <Text className={`font-bold text-2xl ${accountBalance.pnl > 0 ? 'text-accent-green' : accountBalance.pnl < 0 ? 'text-accent-red' : 'text-dark-1'}`}>
          {`${accountBalance.pnl > 0 ? '+' : '-'}${accountBalance.pnl.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
        </Text>
      </View>

    </View>
  )
}

export default AccountOverview