import { View, Text } from 'react-native'
import React from 'react'
import { Bar, CartesianChart, Line } from 'victory-native'
import { colors } from '@/constants/colors'
import { DashPathEffect, useFont } from '@shopify/react-native-skia'
const font = require('../../assets/Inter.ttf')

type DailyReturnsProps = {
  drawdown: number[]
}

const DailyReturns = ({drawdown}: DailyReturnsProps) => {
  const labelFont = useFont(font, 13);

  const data = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    balance: drawdown[i]
  }));

  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      <Text className='font-bold text-xl text-dark-2'>Daily Returns - Last 30 Days</Text>
      <View style={{ height: 300 }}>
        <CartesianChart
          data={data}
          xKey='day'
          yKeys={['balance']}
          yAxis={[{
            font: labelFont,
            labelColor: colors.dark.neutral_2,
            formatYLabel(label) {
              return `${label.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}`
            },
            lineColor: colors.dark.neutral_4,
            linePathEffect: <DashPathEffect intervals={[5, 5]} />
          }]}
          domainPadding={{ left: 5, right: 5 }}
        >
          {({ points, chartBounds }) => (
            <Bar
              points={points.balance}
              color={colors.green_2}
              chartBounds={chartBounds}
              roundedCorners={{ topLeft: 100, topRight: 100 }}
            />
          )}
        </CartesianChart>
      </View>
    </View>
  )
}

export default DailyReturns