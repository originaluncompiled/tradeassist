import { View, Text } from 'react-native'
import { useEffect, useMemo, useState } from 'react'
import { Bar, CartesianChart } from 'victory-native'
import { colors } from '@/constants/colors'
import { DashPathEffect, useFont } from '@shopify/react-native-skia'
import { TradeDataByDay, useStats } from '@/hooks/useStats'
const font = require('../../assets/Inter.ttf')

const DailyPnL = () => {
  const { tradeDataByDay } = useStats();
  const [calendarData, setCalendarData] = useState<TradeDataByDay>([]);
  
  const filteredTradeData = useMemo(() => {
    return tradeDataByDay.map((trade) => {
      // if it's from a different month, then we don't need that trade
      if (new Date(trade.date).getMonth() !== new Date().getMonth()) return;

      // if it's from a different year, then we don't need that trade
      if (new Date(trade.date).getFullYear() !== new Date().getFullYear()) return;

      return trade;
    }).filter((trade) => trade !== undefined);
  }, [tradeDataByDay]);

  useEffect(() => {
    setCalendarData(filteredTradeData);
  }, [filteredTradeData]);

  const [chartBounds, setChartBounds] = useState({ bottom: 0, left: 0, right: 0, top: 0 });

  const labelFont = useFont(font, 12);

  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      <Text className='font-bold text-xl mb-2 text-dark-2'>Daily PnL - This Month</Text>
      <View style={{ height: 300 }}>
        {calendarData.length > 0 ?
          <CartesianChart
            data={calendarData}
            xKey='date'
            yKeys={['totalReturn']}
            yAxis={[{
              font: labelFont,
              labelColor: colors.dark.neutral_2,
              formatYLabel(label) {
                return `${label.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}`
              },
              lineColor: colors.dark.neutral_4,
              linePathEffect: <DashPathEffect intervals={[5, 5]} />
            }]}
            onChartBoundsChange={(chartBounds) => {
              chartBounds = {
                ...chartBounds,
                // Extend the bounds to account for the full width of edge bars, so that they don't get cut off
                left: chartBounds.left + ((chartBounds.right - chartBounds.left) / (calendarData.length) / 4),
                right: chartBounds.right - ((chartBounds.right - chartBounds.left) / (calendarData.length) / 4),
              }
              setChartBounds(chartBounds);
            }}
            domainPadding={{ left: chartBounds.left, right: chartBounds.left }}
          >
            {({ points }) => (
              <Bar
                points={points.totalReturn}
                chartBounds={chartBounds}
                color={colors.green_2}
                roundedCorners={{ topLeft: 5, topRight: 5 }}
                barWidth={(chartBounds.right - chartBounds.left) / (calendarData.length + 1)}
              />
            )}
          </CartesianChart> :
          <View className='flex-1 justify-center items-center'><Text className='text-dark-1 text-lg'>No Trades This Month</Text></View>
        }
      </View>
    </View>
  )
}

export default DailyPnL