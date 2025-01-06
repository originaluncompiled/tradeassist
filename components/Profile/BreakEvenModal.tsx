import { View, Text, Modal, Pressable, TextInput, Platform } from 'react-native'
import { ModalProps, Trade } from '@/constants/types'
import { colors } from '@/constants/colors'
import { useState } from 'react';
import { useUserSettings } from '@/hooks/useUserSettings';
import { useSQLiteContext } from 'expo-sqlite';
import { snakeToCamel } from '@/utils/mapSql';

const BreakEvenModal = ({showModal, updateShowModal}: ModalProps) => {
  const { breakEvenBuffer, setBreakEvenBuffer } = useUserSettings();
  const [value, setValue] = useState(breakEvenBuffer.toString());

  const { accountId } = useUserSettings();
  const db = useSQLiteContext();
  const editBreakEven = async () => {
    try {
      await db.withTransactionAsync(async () => {
        const result = await db.runAsync(
          `UPDATE accounts
          SET
            break_even_buffer = ?
          WHERE id = ?`,
          [
            Number(value) > 100 ? 100 : Number(value),
            accountId
          ]
        );
      });

      const trades: { tradeReturn: number, risk: number }[] = await db.getAllAsync('SELECT trade_return, risk FROM trades WHERE account_id = ? ORDER BY date DESC', [accountId]);

      // update every trade, so that it reflects the new break even buffer
      for (const trade of snakeToCamel(trades)) {
        const breakEvenAmount = trade.risk * (Number(value) > 100 ? 100 : Number(value) / 100);
        const newTradeOutcome = (trade.tradeReturn <= breakEvenAmount && trade.tradeReturn >= -breakEvenAmount) ? 'BREAK EVEN'
          : trade.tradeReturn > 0 ? 'WIN'
          : 'LOSS';

        await db.runAsync(
          `UPDATE trades
          SET
            trade_outcome = ?
          WHERE accountId = ?`,
          [
            newTradeOutcome,
            accountId
          ]
        );
      }

      setBreakEvenBuffer(Number(value) > 100 ? 100 : Number(value));
      updateShowModal(false);
    } catch (error) {
      console.log('Error changing break even buffer:', error);
    }
  }

  return (
    <Modal visible={showModal} onRequestClose={() => updateShowModal(false)} animationType='fade' transparent>
      <View className='flex-1 justify-center items-center'>
        <Pressable className='absolute w-full h-full bg-dark-8/50' onPress={() => updateShowModal(false)}/>

        <View className='px-4 pb-4 pt-2 w-4/5 rounded-2xl bg-dark-7 border border-dark-6'>
          <Text className='text-dark-1 font-semibold text-xl mb-2'>Break Even Buffer</Text>
          <Text className='text-dark-3 font-medium mb-2'>What counts as a break even trade?</Text>

          <View className='flex-row items-center'>
            <TextInput
              placeholder='0'
              placeholderTextColor={colors.dark.neutral_3}
              inputMode='decimal'
              multiline={Platform.OS === "ios" ? false : true} // for some reason fixes the placeholder dissapearing on Android when swiping
              scrollEnabled={false}
              maxLength={3}
              value={value}
              onChangeText={text => setValue(text)}
              className='text-dark-1 font-bold text-lg border-b border-dark-3 px-2 w-16 h-14'
              textAlign='center'
            />
            <Text className='text-dark-2 font-semibold text-lg text-wrap'>% of Each Trade's Risk</Text>
          </View>
          
          <View className='flex-row items-center justify-end mt-4'>
            <Pressable
              className='px-2 py-1 mr-4 rounded-lg border border-dark-3 bg-dark-3/30 active:bg-dark-3/60'
              onPress={() => updateShowModal(false)}
            >
              <Text className='text-lg font-medium text-dark-3'>Cancel</Text>
            </Pressable>
            <Pressable
              className='px-2 py-1 rounded-lg border border-green-2 bg-green-2/40 active:bg-green-2/60'
              onPress={() => {
                editBreakEven();
              }}
            >
              <Text className='text-lg  font-medium text-green-2'>Done</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default BreakEvenModal