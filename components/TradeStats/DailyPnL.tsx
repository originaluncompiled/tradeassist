import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { Bar, CartesianChart } from 'victory-native'
import { colors } from '@/constants/colors'
import { DashPathEffect, useFont } from '@shopify/react-native-skia'
import { useStats } from '@/hooks/useStats'
const font = require('../../assets/Inter.ttf')

const DailyPnL = () => {
  const { tradeDataByDay } = useStats();
  const [graphData, setGraphData] = useState(tradeDataByDay?.reverse());

  useEffect(() => {
    setGraphData(tradeDataByDay?.reverse());
  }, [tradeDataByDay]);

  const [chartBounds, setChartBounds] = useState({ bottom: 0, left: 0, right: 0, top: 0 });

  const labelFont = useFont(font, 12);

  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      <Text className='font-bold text-xl text-dark-2'>Daily PnL - Last 30 Days</Text>
      <View style={{ height: 300 }}>
        {graphData.length > 0 &&
          <CartesianChart
            data={graphData}
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
            xAxis={{
              font: labelFont,
              labelColor: colors.dark.neutral_2,
              formatXLabel(label) {
                return `${label?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
              },
            }}
            onChartBoundsChange={(chartBounds) => {
              chartBounds = {
                ...chartBounds,
                // Extend the bounds to account for the full width of edge bars, so that they don't get cut off
                left: chartBounds.left + ((chartBounds.right - chartBounds.left) / (graphData.length) / 4),
                right: chartBounds.right - ((chartBounds.right - chartBounds.left) / (graphData.length) / 4),
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
                barWidth={(chartBounds.right - chartBounds.left) / (graphData.length + 1)}
              />
            )}
          </CartesianChart>
        }
      </View>
    </View>
  )
}

export default DailyPnL