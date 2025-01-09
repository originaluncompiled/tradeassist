import { View, Text, TextInput, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { TransactionCardProps } from '@/constants/types'
import SetTime from '../LogTrade/TradeTimes/SetTradeTimes'
import DropDownPicker from 'react-native-dropdown-picker'
import { useEffect, useMemo, useState } from 'react'

const TransactionCard = ({ id, locale, currencyCode, updateTxs, txs, tradeData }: TransactionCardProps) => {
  const createTxs = (info: Partial<typeof txs[0]>) => {
    const newTxs = [...txs];
    newTxs[id] = { ...txs[id], ...info };
    updateTxs(newTxs);
  }

  const updateBalanceAfterTx = useMemo(() => {
    if (Number(txs[id].value) < 1 || !txs[id].value) return txs[id + 1]?.balanceAfterTx;
    if (id === txs.length - 1) return txs[id].balanceAfterTx;

    const tradeRange = tradeData.filter((trade) => {
      // if the trade happened between the previous & current transaction, then we can use it to calculate the balance
      if (txs[id - 1]?.time < new Date(trade.time).getTime() && new Date(trade.time).getTime() < txs[id].time) {
        return trade;
      }
    });
    const previousTrades = tradeRange.filter((trade) => new Date(trade.time).getTime() <= new Date(txs[id].time).getTime());
    const totalReturn = previousTrades.reduce((total, trade) => trade.tradeReturn + total, 0);

    let transactionChange = 0;
    if (txs[id].txType === 'Deposit') transactionChange = totalReturn + Number(txs[id].value.toString().replace(',', ''));
    else transactionChange = totalReturn - Number(txs[id].value.toString().replace(',', ''));
    
    return txs[id + 1]?.balanceAfterTx + transactionChange;
  }, [txs[id].time, txs[id].txType, txs[id].value]);

  const updateTime = (newTime: number) => {
    createTxs({ time: newTime });
  }

  useEffect(() => {
    createTxs({ balanceAfterTx: updateBalanceAfterTx });
  }, [updateBalanceAfterTx]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState<'Withdrawal' | 'Deposit'>(txs[id].txType);
  
  useEffect(() => {
    createTxs({ txType: value });
  }, [value]);

  useEffect(() => {
    if (txs[id].txType === value) return;
    setValue(txs[id].txType);
  }, [txs[id].txType])

  return (
    <View className='flex-1 px-4 py-2 mb-4 border rounded-lg border-dark-6 bg-dark-6/50'>
      <View className='flex-row items-center justify-between mb-3'>
        {/* Don't allow the user to delete the first/initial deposit */}
        {id !== txs.length - 1 &&
          <Pressable onPress={() => updateTxs(txs.filter((_, index) => index !== id))}>
            <MaterialCommunityIcons name='delete' size={24} color={colors.accent_red} />
          </Pressable>
        }

        <TextInput
          className='text-lg text-dark-1 border-b border-dark-3 w-5/12 h-12'
          value={txs[id].value === 0 ? '' : txs[id].value.toString()}
          onChangeText={(text) => createTxs({ value: Number(text) })}
          placeholder='Tx Value'
          inputMode='numeric'
          maxLength={9}
          placeholderTextColor={colors.dark.neutral_3}
          selectionColor={`${colors.green_2}B4`}
          scrollEnabled={false}
        />

        <SetTime text='Date & Time' caption={false} updateTime={updateTime} time={txs[id].time}/>
      </View>

      <View className='flex-row items-center justify-between'>
        <TextInput
          className='text-lg text-dark-1 border-b border-dark-3 px-2 w-2/6 h-12'
          value={txs[id].currency.toString()}
          onChangeText={(text) => createTxs({ currency: text })}
          placeholder='Currency'
          maxLength={10}
          placeholderTextColor={colors.dark.neutral_3}
          selectionColor={`${colors.green_2}B4`}
          scrollEnabled={false}
        />
        <DropDownPicker
          open={dropdownOpen}
          setOpen={setDropdownOpen}
          value={id === txs.length - 1 ? 'Deposit' : value}
          setValue={setValue}
          items={id === txs.length - 1 ? [
            { label: 'Deposit', value: 'Deposit' }
          ] : [
            { label: 'Deposit', value: 'Deposit' },
            { label: 'Withdrawal', value: 'Withdrawal' }
          ]}
          placeholder='Type'
          listMode='SCROLLVIEW'
          containerStyle={{ width: '60%', padding: 0 }}
          style={{ backgroundColor: colors.dark.neutral_6, borderColor: colors.dark.neutral_5 }}
          textStyle={{ color: colors.dark.neutral_1, fontSize: 16, fontWeight: 600 }}
          dropDownContainerStyle={{ backgroundColor: colors.dark.neutral_6, borderColor: colors.dark.neutral_5 }}
          ArrowUpIconComponent={({ style }) => (
            <MaterialCommunityIcons name='arrow-up' size={20} color={colors.green_2} styles={style} />
          )}
          ArrowDownIconComponent={({ style }) => (
            <MaterialCommunityIcons name='arrow-down' size={20} color={colors.green_2} styles={style} />
          )}
          TickIconComponent={({ style }) => (
            <MaterialCommunityIcons name='check' size={20} color={colors.green_2} styles={style} />
          )}
        />
      </View>

      <View className='flex-row items-center justify-between my-2'>
        <Text className='text-dark-2 font-semibold text-lg'>Balance After Tx</Text>
        <Text className='text-dark-1 font-semibold text-lg'>{txs[id].balanceAfterTx.toLocaleString(locale, { style: 'currency', currency: currencyCode})}</Text>
        {/* createTxs({ balanceAfterTx: Number(text) }) */}
      </View>
    </View>
  )
}

export default TransactionCard