import { Pressable, Text, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { TradeCardProps, TradePage } from '@/constants/types'
import { router } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { useUserSettings } from '@/hooks/useUserSettings'
import { snakeToCamel } from '@/utils/mapSql'

const TradeCard = ({ tradeInfo, lightBg, onClick, onClickValue }: TradeCardProps) => {
  const { locale, currency } = useUserSettings();

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString(locale, { month: '2-digit', day: '2-digit', year: 'numeric' });
  }

  // Send the trade's information that corresponds to the trade card clicked
  const db = useSQLiteContext();
  const sendToTradePage = async () => {
    try {
      const result: TradePage[] = await db.getAllAsync(`SELECT * FROM trades WHERE id = ?`, [tradeInfo.id]);
      // Stringify it so it can be passed to the trade page
      
      const camelCaseResult = snakeToCamel(result);
      router.push({ pathname: '/trade-history/logtrade', params: { trade: JSON.stringify(camelCaseResult[0]) } });
    } catch (error) {
      console.log('Error fetching trade info: ', error);
    }
  }

  return (
    <View className='flex-row items-center justify-center mb-4'>
      <Pressable
        className={`flex-1 mx-[2px] px-4 pt-2 pb-4 rounded-2xl border ${lightBg ? 'border-dark-5 active:bg-dark-5 bg-dark-6' : 'border-dark-6 active:bg-dark-6 bg-dark-7'}`}
        onPress={() => {
          // Sends the user to the logtrade page, with all of the trade's information
          // This allows it to not show/push to the trade page if it couldn't get the trade
          sendToTradePage();
          if (onClick) onClick(onClickValue);
        }}
      >
        <View className='flex flex-row justify-between mb-2'>
          {/* Trade Date + Asset */}
          <View className='flex-row items-center'>
            <Text className='text-dark-1 font-bold text-2xl'>
              {formatDate(tradeInfo.date)}
            </Text>
            <Text className='text-dark-2 font-bold italic text-xl'>
              &nbsp;- {tradeInfo.asset}
            </Text>
          </View>
          <View className='flex flex-row items-center'>
            {/* Trade Rating */}
            <Text className='text-dark-1 font-bold text-xl'>
              {tradeInfo.rating}
            </Text>
            <MaterialCommunityIcons name='star' size={18} color={colors.dark.neutral_1} />
          </View>
        </View>
        
        <View className='flex-row justify-between items-center'>
          <View className='flex-row'>
            {/* $ Made/Lost */}
            <View
              className={`flex px-2 py-1 mr-2 rounded-lg ${tradeInfo.tradeOutcome === 'WIN' ?
                  'bg-accent-green/50 border border-accent-green'
                  : (tradeInfo.tradeOutcome === 'LOSS') ? 'bg-accent-red/50 border border-accent-red' : 'bg-dark-5/50 border border-dark-5'}`}
              >
              <Text className='text-dark-1'>
                {tradeInfo.tradeReturn.toLocaleString('en-US', { style: 'currency', currency: currency })}
              </Text>
            </View>

            {/* Trade Direction */}
            <View
              className={`flex px-2 py-1 mr-2 rounded-lg
                ${tradeInfo.direction.toLowerCase() === 'short' ?
                'bg-blue-400/50 border border-blue-400'
                : 'bg-gray-600/50 border border-gray-600'}`}
            >
              <Text className='text-dark-1'>{tradeInfo.direction}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default TradeCard