import { View, Text, KeyboardAvoidingView, ScrollView, Keyboard, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { useUserSettings } from '@/hooks/useUserSettings'
import { useSQLiteContext } from 'expo-sqlite'
import { snakeToCamel } from '@/utils/mapSql'
import TransactionCard from '@/components/Profile/TransactionCard'
import EditBalanceButton from '@/components/Profile/EditBalanceButton'

const balancehistory = () => {
  // Prevents the add button from being above the keyboard when it's is open
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
  Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

  const [txs, setTxs] = useState<{
    accountId: number,
    value: number,
    time: number,
    txType: 'Deposit' | 'Withdrawal',
    // currency is also 'coin' when crypto
    currency: string,
    balanceAfterTx: number
  }[]>([]);
  const updateTxs = (info: typeof txs) => {
    // sort the txs by time, so that the 'balance after tx' is accurate
    const sortedTxs = [...info].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    
    setTxs(sortedTxs);
  };

  const [tradeData, setTradeData] = useState<{ time: string, tradeReturn: number }[]>([]);

  const { accountId, locale, currency } = useUserSettings();
  const db = useSQLiteContext();
  const fetchInfo = async () => {
    try {
      const balanceHistoryData: typeof txs = await db.getAllAsync('SELECT * FROM balance_history WHERE account_id = ?', [accountId]);
      setTxs(snakeToCamel(balanceHistoryData));
      
      // used for calculating the 'Balance after tx'
      const tradeData: { time: string, tradeReturn: number }[] = await db.getAllAsync('SELECT date, trade_return FROM trades WHERE account_id = ?', [accountId]);
      setTradeData(snakeToCamel(tradeData));
    } catch (error) {
      console.log('Error fetching balance history: ', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [])

  return (
    <View className='flex-1 bg-dark-8 px-4'>
      <KeyboardAvoidingView className='flex-1 mt-5' behavior='padding'>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
          {
            txs.map((tx, index) => (
              <TransactionCard key={index} txs={txs} updateTxs={updateTxs} id={index} locale={locale} currencyCode={currency} tradeData={tradeData} />
            ))
          }
        </ScrollView>
      </KeyboardAvoidingView>
      
      {!keyboardVisible &&
        <View>
          <Pressable
            className='flex-row items-center justify-center p-3 mb-5 mt-5 border border-dashed rounded-lg border-dark-6 bg-dark-7/50 active:bg-dark-6/50'
            onPress={() => updateTxs([...txs, { accountId: accountId, value: 0, time: new Date().getTime(), txType: 'Withdrawal', currency: '', balanceAfterTx: txs[0].balanceAfterTx } ]) }
          >
            <MaterialCommunityIcons name='plus-thick' size={18} color={colors.dark.neutral_3} style={{ paddingLeft: 4, paddingRight: 8}} />
            <Text className='text-dark-3 text-lg font-bold'>Add Transaction</Text>
          </Pressable>
          
          <EditBalanceButton txs={txs} />
        </View>
      }
    </View>
  )
}

export default balancehistory