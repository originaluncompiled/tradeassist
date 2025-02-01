import { View, Text } from 'react-native'
import { Area, CartesianChart, Line } from 'victory-native'
import { colors } from '@/constants/colors'
import { DashPathEffect, useFont } from '@shopify/react-native-skia'
import { useEffect, useMemo, useState } from 'react'
import { useUserSettings } from '@/hooks/useUserSettings'
import { useStats } from '@/hooks/useStats'
const font = require('../../assets/Inter.ttf')

const Drawdown = () => {
  const { currency } = useUserSettings();

  const labelFont = useFont(font, 12);
  const { tradeDataByDay } = useStats();
  const [graphData, setGraphData] = useState<{day: number, balance: number}[]>([{ day: 0, balance: 0 }]);

  const getDrawdown = useMemo(() => {
    let data: {day: number, balance: number}[] = [{ day: 0, balance: 0 }];
    // tradeData goes from the latest trade to the oldest trade
    const drawdownArray = tradeDataByDay.map((trade) => trade.totalReturn);
    drawdownArray.reduce((total, currentValue, index) => {      
      data.push({
        day: index + 1,
        balance: total + currentValue
      })

      return total = total + currentValue;
    }, 0);
    
    return data;
  }, [tradeDataByDay]);

  useEffect(() => {
    setGraphData(getDrawdown);
  }, [getDrawdown]);

  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      <Text className='font-bold text-xl text-dark-2'>Drawdown</Text>
      <View style={{ height: 300 }}>
        {/* By default graph data has { day: 0, balance: 0 } */}
        {graphData.length > 1 ?
          <CartesianChart
            data={graphData}
            xKey='day'
            yKeys={['balance']}
            yAxis={[{
              font: labelFont,
              labelColor: colors.dark.neutral_2,
              formatYLabel(label) {
                return `${label.toLocaleString('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 })}`
              },
              lineColor: colors.dark.neutral_4,
              linePathEffect: <DashPathEffect intervals={[5, 5]} />
            }]}
          >
            {({ points }) => (
              <Line
                points={points.balance}
                color={colors.green_2}
                curveType='cardinal'
                strokeWidth={2}
                // y0={points.balance[0].y as number}
              />
            )}
          </CartesianChart> :
          <View className='flex-1 justify-center items-center'><Text className='text-dark-1 text-lg'>No Trades Found</Text></View>
        }
      </View>
    </View>
  )
}

export default Drawdown