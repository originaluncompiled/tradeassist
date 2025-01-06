import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useUserSettings } from '@/hooks/useUserSettings';
import { EditAssetsButtonProps } from '@/constants/types';

const EditAssetsButton = ({ assets }: EditAssetsButtonProps) => {
  const { market, accountId } = useUserSettings();

  const db = useSQLiteContext();
  const saveAssets = async () => {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM assets WHERE account_id = ?', [accountId]); // first clear assets
      });

      for (const asset of assets) {
        await db.withTransactionAsync(async () => {
          await db.runAsync(
            `INSERT INTO assets (
              account_id,
              asset_name
            )
            VALUES (?, ?)`, 
            [
              accountId,
              asset.assetName
            ]
          );
        });
      }

      router.dismiss();
    } catch (error) {
      console.log('Error editing trade:', error);
    }
  }

  return (
    <Pressable
      className='rounded-lg mb-4 bg-green-2/75 active:bg-green-2 border-2 border-green-2'
      onPress={() => {
        saveAssets();
      }}
    >
      <Text className='text-lg text-dark-7 font-bold text-center p-3'>
        Save {market === 'Forex' ? 'Pairs'
          : market === 'Futures' ? 'Contracts'
          : market === 'Crypto' ? 'Coins'
          : 'Stocks'}
      </Text>
    </Pressable>
  )
}

export default EditAssetsButton