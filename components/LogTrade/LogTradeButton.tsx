import { Text, Pressable, View } from 'react-native'
import { router } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite';
import { useTradeContext } from '@/hooks/useTradeContext';

const LogTradeButton = () => {
  const { tradeState, dispatch } = useTradeContext();
  const db = useSQLiteContext();

  const writeTrade = async () => {
    try {
      const result = await db.runAsync(
        `INSERT INTO trades
        (asset, date, assetType, tradeReturn, tradeOutcome, direction, rating, balanceChange, takeProfit, stopLoss, target, risk, entry, exit, entryTime, exitTime, amountTraded, commission, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [
          tradeState.asset,
          tradeState.date.toISOString(),
          tradeState.assetType,
          tradeState.tradeReturn,
          tradeState.tradeOutcome,
          tradeState.direction,
          tradeState.rating,
          tradeState.balanceChange,
          tradeState.takeProfit,
          tradeState.stopLoss,
          tradeState.target,
          tradeState.risk,
          tradeState.entry,
          tradeState.exit,
          tradeState.entryTime,
          tradeState.exitTime,
          tradeState.amountTraded,
          tradeState.commission,
          tradeState.notes
        ]
      );

      const final = await db.getFirstAsync(
        `SELECT * FROM trades WHERE id = ?`,
        [result.lastInsertRowId]
      )

      console.log(final);

      router.navigate('/(tabs)/tradehistory');
    } catch (error) {
      console.log('Error logging trade:', error);
    }
  }

  return (
    <View className='absolute bottom-0 left-0 right-0 mx-4'>
      <Pressable
        className='rounded-lg mb-4 bg-green-2/75 active:bg-green-2 border-2 border-green-2'
        onPress={() => writeTrade()}
      >
        <Text className='text-lg text-dark-7 font-bold text-center p-3'>Log Trade</Text>
      </Pressable>
    </View>
  )
}

export default LogTradeButton