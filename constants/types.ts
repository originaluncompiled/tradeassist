import { Dispatch } from "react";
import { ScrollView } from "react-native"

// Types:
export type ShortDate = [
  day: number,
  month: number,
  year: number,
];

export type Trade = {
  date: ShortDate,
  asset: string,
  rating: number,
  return: number,
  roi: number,
  direction: string,
}

export type JournalEntry = {
  date: ShortDate,
  asset: string,
  status?: 'Win' | 'Loss' | 'Break Even',
  snippet?: string,
}

export type TradePage = {
  tradeReturn: number,
  tradeOutcome: 'WIN' | 'LOSS' | 'BREAK EVEN',
  direction: 'Long' | 'Short',
  rating: number,
  balanceChange: number,
  entry: number,
  exit: number,
  takeProfit: number,
  stopLoss: number,
  amountTraded: number,
  commission: number,
}

export type TradeAction = 
  { type: 'TRADE_RETURN', payload: number} |
  { type: 'TRADE_OUTCOME', payload: 'WIN' | 'LOSS' | 'BREAK EVEN'} |
  { type: 'DIRECTION', payload: 'Long' | 'Short'} |
  { type: 'RATING', payload: number} |
  { type: 'BALANCE_CHANGE', payload: number} |
  { type: 'ENTRY', payload: number} |
  { type: 'EXIT', payload: number} |
  { type: 'TAKE_PROFIT', payload: number} |
  { type: 'STOP_LOSS', payload: number} |
  { type: 'AMOUNT_TRADED', payload: number} |
  { type: 'COMMISSION', payload: number}

export type TradeContextType = {
  tradeState: TradePage,
  dispatch: Dispatch<TradeAction>
}

// Props:
export type TradeCardProps = {
  tradeInfo: Trade,
}

export type JournalCardProps = {
  journalInfo: JournalEntry,
}

export type TradePopUpProps = {
  updateClicked: () => void,
}

export type FilterSectionProps = {
  filters: string[],
  updateFilters: (
    filter: string | string[],
    action: 'remove' | 'add' | 'clear',
    scrollViewRef?: React.RefObject<ScrollView>
  ) => void,
}

export type FilterItemProps = {
  filterText: string,
  changeFilter: (
    filter: string | string[],
    action: 'remove' | 'add' | 'clear',
    scrollViewRef?: React.RefObject<ScrollView>
  ) => void,
  scrollViewRef: React.RefObject<ScrollView>,
}

export type AccountOverviewProps = {
  timeline: string,
}

export type ButtonProps = {
  icon?: string,
  customClasses?: string,
  type?: 'large' | 'compact',
  text: string,
  buttonAction: Function,
}

export type TimelineSelectorProps = {
  timeline: string,
  changeTimeline: (option: string) => void,
}

export type TradeOutcomeProps = {
  tradeState: TradePage,
  handleInputChange: (
    input: number | string,
    dispatchAction: 'RATING' | 'TRADE_RETURN' | 'DIRECTION' | 'TRADE_RETURN'
  ) => void,
}

export type MoneyInputProps = {
  text: string,
  dispatchAction: 'ENTRY'|'EXIT'|'TAKE_PROFIT'|'STOP_LOSS'|'AMOUNT_TRADED'|'COMMISSION'|'BALANCE_CHANGE'
  handleInputChange: (
    input: number,
    dispatchAction: 'ENTRY'|'EXIT'|'TAKE_PROFIT'|'STOP_LOSS'|'AMOUNT_TRADED'|'COMMISSION'|'BALANCE_CHANGE'
  ) => void,
}

export type SetTradeTimesProps = {
  text: string,
  time: number,
  updateTime: (time: number) => void,
}

export type RiskRewardProps = {
  tradeState: TradePage,
  handleInputChange: (
    input: number,
    dispatchAction: 'BALANCE_CHANGE'
  ) => void,
}

export type InputChangeAsProp = {
  tradeState: TradePage,
  handleInputChange: (
    input: number | string,
    dispatchAction: 'RATING' | 'TRADE_RETURN' | 'DIRECTION' | 'TRADE_RETURN'
  ) => void,
}