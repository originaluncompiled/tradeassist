import { Text, Pressable, View } from 'react-native'
import { router } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { LogTradeButtonProps, TradePage } from '@/constants/types'
import { useEffect, useRef } from 'react'
import { useTradeContext } from '@/hooks/useTradeContext'
import { useUserSettings } from '@/hooks/useUserSettings'

const LogTradeButton = ({ isEditingTrade }: LogTradeButtonProps) => {
  const { tradeState } = useTradeContext();
  // A ref to the most up to date version of tradeState
  const tradeStateRef = useRef(tradeState);

  // Update the ref whenever tradeState changes to make sure it's always the most up to date
  useEffect(() => {
    tradeStateRef.current = tradeState;
  }, [tradeState]);

  const { accountId } = useUserSettings();
  
  const db = useSQLiteContext();

  const writeTrade = async (state: TradePage) => {
    try {
      await db.withTransactionAsync(async () => {
        const result = await db.runAsync(
          `INSERT INTO trades (
            account_id,
            asset,
            date,
            trade_return,
            trade_outcome,
            direction,
            rating,
            balance_change,
            take_profit,
            stop_loss,
            target,
            risk,
            entry,
            exit,
            entry_time,
            exit_time,
            amount_traded,
            commission,
            notes
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
          [
            accountId,
            state.asset,
            new Date(state.date).toISOString(),
            state.tradeReturn,
            state.tradeOutcome,
            state.direction,
            state.rating,
            state.balanceChange,
            state.takeProfit,
            state.stopLoss,
            state.target,
            state.risk,
            state.entry,
            state.exit,
            state.entryTime,
            state.exitTime,
            state.amountTraded,
            state.commission,
            state.notes
          ]
        );
      });
      
      router.dismiss();
    } catch (error) {
      console.log('Error writing trade:', error);
    }
  }

  const editTrade = async (state: TradePage) => {
    try {
      await db.withTransactionAsync(async () => {
        const result = await db.runAsync(
          `UPDATE trades
          SET
            account_id = ?,
            asset = ?,
            date = ?,
            trade_return = ?,
            trade_outcome = ?,
            direction = ?,
            rating = ?,
            balance_change = ?,
            take_profit = ?,
            stop_loss = ?,
            target = ?,
            risk = ?,
            entry = ?,
            exit = ?,
            entry_time = ?,
            exit_time = ?,
            amount_traded = ?,
            commission = ?,
            notes = ?
          WHERE id = ?`, 
          [
            accountId,
            state.asset,
            new Date(state.date).toISOString(),
            state.tradeReturn,
            state.tradeOutcome,
            state.direction,
            state.rating,
            state.balanceChange,
            state.takeProfit,
            state.stopLoss,
            state.target,
            state.risk,
            state.entry,
            state.exit,
            state.entryTime,
            state.exitTime,
            state.amountTraded,
            state.commission,
            state.notes,
            Number(state.id),
          ]
        );
      });

      router.dismiss();
    } catch (error) {
      console.log('Error editing trade:', error);
    }
  }

  return (
    <View className='absolute bottom-0 left-0 right-0 mx-4'>
      <Pressable
        className='rounded-lg mb-4 bg-green-2/75 active:bg-green-2 border-2 border-green-2'
        onPress={() => {
          if (isEditingTrade) {
            editTrade(tradeStateRef.current);
          } else {
            writeTrade(tradeStateRef.current);
          };
        }}
      >
        <Text className='text-lg text-dark-7 font-bold text-center p-3'>{isEditingTrade ? 'Edit Trade' : 'Log Trade'}</Text>
      </Pressable>
    </View>
  )
}

export default LogTradeButton