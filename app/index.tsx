import { View, Text, Pressable } from 'react-native'
import Separator from '@/components/Separator'
import Button from '@/components/Button'
import { router, useLocalSearchParams } from 'expo-router'
import { useUserSettings } from '@/hooks/useUserSettings'
import { useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite'
import { colors } from '@/constants/colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const index = () => {
  // Get the account's id from the query params (sent from the setup page)
  const { newAccountId } = useLocalSearchParams<{ newAccountId: string }>();

  const { accountId, setAccountId } = useUserSettings();
  useEffect(() => {
    if (newAccountId) {
      setAccountId(Number(newAccountId));
    };
  }, [newAccountId]);

  useEffect(() => {
    // might be an issue if the first account has an id of zero (don't know if that's possible)
    if (accountId || newAccountId) {
      router.replace('/stats');
    };
  }, [accountId]);

  const db = useSQLiteContext();
  const [accounts, setAccounts] = useState<{ id: number, name: string }[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // TO-DO: Memoize this for performance, and make it get called as little as possible
        let fetchedAccounts: { id: number, name: string }[] = await db.getAllAsync('SELECT id, name, market FROM accounts ORDER BY name DESC');

        // If there was no change in the accounts, then we don't need to cause a bunch of re-renders by updating the accounts list
        if (JSON.stringify(fetchedAccounts) === JSON.stringify(accounts)) {
          return;
        };
        setAccounts(fetchedAccounts);
      } catch (error) {
        console.log('Error fetching accounts: ', error);
      }
    }

    fetchAccounts();
  }, [])

  return (
    <View className='flex-1 m-4'>
      <Text className='text-dark-1 font-semibold text-2xl text-center'>Your Trading Accounts</Text>
      <Separator margin='my-4' color='bg-dark-5' />
      <View className='flex-1'>
        {
          accounts.map((account) => (
            <Button key={account.id} icon='account' text={account.name} type='large' buttonAction={() => setAccountId(account.id)} />
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