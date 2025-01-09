import { Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useUserSettings } from '@/hooks/useUserSettings';
import { EditBalanceButtonProps } from '@/constants/types';

const EditBalanceButton = ({ txs }: EditBalanceButtonProps) => {
  const { accountId, setStartingBalance } = useUserSettings();

  const db = useSQLiteContext();
  const saveAssets = async () => {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM balance_history WHERE account_id = ?', [accountId]); // first clear transactions
      });

      for (const tx of txs) {
        if (tx.value === '') continue;
        
        await db.withTransactionAsync(async () => {
          await db.runAsync(
            `INSERT INTO balance_history (
              account_id,
              value,
              time,
              tx_type,
              currency,
              balance_after_tx
            )
            VALUES (?, ?, ?, ?, ?, ?)`, 
            [
              accountId,
              Number(tx.value),
              new Date(tx.time).toISOString(),
              tx.txType,
              tx.currency,
              tx.balanceAfterTx
            ]
          );
        });
      }

      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `UPDATE accounts
          SET
            starting_balance =?
          WHERE id = ?`,
          [
            txs[0].balanceAfterTx,
            accountId
          ]
        );
      });
      setStartingBalance(txs[0].balanceAfterTx);

      router.dismiss();
    } catch (error) {
      console.log('Error editing balance history:', error);
    }
  }

  return (
    <Pressable
      className='rounded-lg mb-4 bg-green-2/75 active:bg-green-2 border-2 border-green-2'
      onPress={() => {
        saveAssets();
      }}
    >
      <Text className='text-lg text-dark-7 font-bold text-center p-3'>Save Balance History</Text>
    </Pressable>
  )
}

export default EditBalanceButton