import { Text, Pressable, View } from 'react-native'
import { router } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { LogTradeButtonProps, TradePage } from '@/constants/types'
import { useEffect, useRef } from 'react'

const LogTradeButton = ({ isEditingTrade, tradeState }: LogTradeButtonProps) => {
  // A ref to the most up to date version of tradeState
  const tradeStateRef = useRef(tradeState);

  // Update the ref whenever tradeState changes to make sure it's always the most up to date
  useEffect(() => {
    tradeStateRef.current = tradeState;
  }, [tradeState]);
  
  const db = useSQLiteContext();

  const writeTrade = async (state: TradePage) => {
    try {
      // TO-DO: Use transactions, so that faulty thingies don't get added and just take up space
      const result = await db.runAsync(
        `INSERT INTO trades
        (asset, date, assetType, tradeReturn, tradeOutcome, direction, rating, balanceChange, takeProfit, stopLoss, target, risk, entry, exit, entryTime, exitTime, amountTraded, commission, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [
          state.asset,
          state.date.toString(),
          state.assetType,
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
      
      router.navigate('/(tabs)/tradehistory');
    } catch (error) {
      console.log('Error writing trade:', error);
    }
  }

  const editTrade = async (state: TradePage) => {
    try {
      // TO-DO: Use transactions, so that faulty thingies don't get added and just take up space
      const result = await db.runAsync(
        `UPDATE trades
        SET
          asset = ?,
          date = ?,
          assetType = ?,
          tradeReturn = ?,
          tradeOutcome = ?,
          direction = ?,
          rating = ?,
          balanceChange = ?,
          takeProfit = ?,
          stopLoss = ?,
          target = ?,
          risk = ?,
          entry = ?,
          exit = ?,
          entryTime = ?,
          exitTime = ?,
          amountTraded = ?,
          commission = ?,
          notes = ?
        WHERE id = ?`, 
        [
          state.asset,
          state.date.toString(),
          state.assetType,
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

      router.navigate('/(tabs)/tradehistory');
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