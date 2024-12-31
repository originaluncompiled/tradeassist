import { TradePage } from '@/constants/types'
import { create } from 'zustand'

export type TradeDataByDay = {date: Date, totalReturn: number, outcome: 'WIN' | 'LOSS' | 'BREAK EVEN', trades: TradePage[]}[]

type StatsProps = {
  tradeDataByDay: TradeDataByDay,
  setTradeDataByDay: (tradeData: TradeDataByDay) => void,
}

export const useStats = create<StatsProps>((set) => ({
  tradeDataByDay: [],
  setTradeDataByDay: (tradeData: TradeDataByDay) => set({ tradeDataByDay: tradeData }),
}))