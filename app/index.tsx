import { View, Text, Pressable } from 'react-native'
import Separator from '@/components/Separator'
import { router, useLocalSearchParams } from 'expo-router'
import { useUserSettings } from '@/hooks/useUserSettings'
import { useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite'
import { colors } from '@/constants/colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const index = () => {
  const { accountId, setAccountId, setMarket, setStartingBalance, setCurrency } = useUserSettings();
  const [accounts, setAccounts] = useState<{ id: number, name: string, currency: string, market: 'Forex' | 'Futures' | 'Stocks' | 'Crypto', startingBalance: number }[]>([]);

  // Get the account's id from the query params (sent from the setup page)
  const { newAccountId } = useLocalSearchParams<{ newAccountId: string }>();
  useEffect(() => {
    if (newAccountId) {
      setAccountId(Number(newAccountId));
    };
  }, [newAccountId]);

  useEffect(() => {
    try {
      if (!accountId || accountId === 0) return;

      setMarket(accounts[accounts.findIndex(account => account.id === accountId)].market);
      setStartingBalance(accounts[accounts.findIndex(account => account.id === accountId)].startingBalance);
      setCurrency(accounts[accounts.findIndex(account => account.id === accountId)].currency);
      router.replace('/stats');
    } catch(error) {
      console.log('Error updating account info and navigating: ', error);
    }
  }, [accounts]);

  const db = useSQLiteContext();
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        let fetchedAccounts: {
          id: number,
          name: string,
          currency: string,
          market: 'Forex' | 'Futures' | 'Stocks' | 'Crypto',
          startingBalance: number
        }[] = await db.getAllAsync('SELECT id, name, currency, market, startingBalance FROM accounts ORDER BY name DESC');

        setAccounts(fetchedAccounts);
      } catch (error) {
        console.log('Error fetching accounts: ', error);
      }
    }

    fetchAccounts();
    // every time there's a new account created (indicated by the newAccountId changing) we should fetch the accounts, with that new one now
  }, [accountId, newAccountId]);

  return (
    <View className='flex-1 m-4'>
      <Text className='text-dark-1 font-semibold text-2xl text-center'>Your Trading Accounts</Text>
      <Separator margin='my-4' color='bg-dark-5' />
      <View className='flex-1'>
        {
          accounts.map((account) => (
            <Pressable
              key={account.id} 
              className='flex-row justify-between border rounded-lg border-dark-5 bg-dark-6 active:bg-dark-5 p-3 my-2'
              onPress={() => setAccountId(account.id)}
            >
              <View className='flex-row items-center'>
                <MaterialCommunityIcons name='account' size={18} color={colors.dark.neutral_1} style={{ paddingLeft: 4, paddingRight: 8}} />
                <Text className='text-dark-1 text-lg font-bold'>{account.name}</Text>
              </View>
              <Text className='text-dark-2 text-lg font-bold'>{account.market}</Text>
            </Pressable>
          ))
        }
        <Pressable
          className='flex-row items-center justify-center border border-dashed rounded-lg border-dark-6 bg-dark-7/50 active:bg-dark-6/50 p-3 my-2'
          onPress={() => router.push('/setup')}
        >
          <MaterialCommunityIcons name='plus-thick' size={18} color={colors.dark.neutral_3} style={{ paddingLeft: 4, paddingRight: 8}} />
          <Text className='text-dark-3 text-lg font-bold'>Add Account</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default index