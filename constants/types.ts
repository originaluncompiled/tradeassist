import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { Dispatch } from "react"
import { ScrollView } from "react-native"

// Types:
export type Trade = {
  id: number,
  date: string,
  asset: string,
  rating: number,
  tradeReturn: number,
  balanceChange: number,
  direction: 'Long' | 'Short',
}

export type JournalEntry = {
  date: string,
  asset: string,
  status?: 'Win' | 'Loss' | 'Break Even',
  snippet?: string,
}

export type TradePage = {
  id?: number,
  asset: string,
  date: Date,
  assetType: 'Stocks' | 'Futures' | 'Forex' | 'Crypto' | 'Options',
  tradeReturn: number,
  tradeOutcome: 'WIN' | 'LOSS' | 'BREAK EVEN',
  direction: 'Long' | 'Short',
  rating: number,
  balanceChange: number,
  takeProfit: number,
  stopLoss: number,
  target: number,
  risk: number,
  entry: number,
  exit: number,
  entryTime: number, //date.getTime (stores the amount of milliseconds since 1970)
  exitTime: number, //date.getTime (stores the amount of milliseconds since 1970)
  amountTraded: number,
  commission: number,
  notes: string,
}

export type TradeAction = 
  { type: 'ASSET', payload: string} |
  { type: 'DATE', payload: Date} |
  { type: 'ASSET_TYPE', payload: 'Stocks' | 'Futures' | 'Forex' | 'Crypto' | 'Options'} |
  { type: 'TRADE_RETURN', payload: number} |
  { type: 'TRADE_OUTCOME', payload: 'WIN' | 'LOSS' | 'BREAK EVEN'} |
  { type: 'DIRECTION', payload: 'Long' | 'Short'} |
  { type: 'RATING', payload: number} |
  { type: 'BALANCE_CHANGE', payload: number} |
  { type: 'TAKE_PROFIT', payload: number} |
  { type: 'STOP_LOSS', payload: number} |
  { type: 'TARGET', payload: number} |
  { type: 'RISK', payload: number} |
  { type: 'ENTRY', payload: number} |
  { type: 'EXIT', payload: number} |
  { type: 'ENTRY_TIME', payload: number} |
  { type: 'EXIT_TIME', payload: number} |
  { type: 'AMOUNT_TRADED', payload: number} |
  { type: 'COMMISSION', payload: number} |
  { type: 'NOTES', payload: string}

export type TradeContextType = {
  tradeState: TradePage,
  dispatch: Dispatch<TradeAction>
}

// Props:
export type TradeCardProps = {
  tradeInfo: Trade,
}

export type DeleteSectionProps = {
  updateLongPressed: (value: boolean) => void,
  updateSelectedTrades: (id: number, action: 'add' | 'remove' | 'clear') => void,
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
  text?: string,
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
    dispatchAction: 'RATING' | 'TRADE_RETURN' | 'DIRECTION' | 'TRADE_OUTCOME'
  ) => void,
}

export type MoneyInputProps = {
  text: string,
  initialValue: number,
  dispatchAction: 'ENTRY'|'EXIT'|'TAKE_PROFIT'|'STOP_LOSS'|'AMOUNT_TRADED'|'COMMISSION'|'BALANCE_CHANGE'|'TARGET'|'RISK',
  handleInputChange: (
    input: number,
    dispatchAction: 'ENTRY'|'EXIT'|'TAKE_PROFIT'|'STOP_LOSS'|'AMOUNT_TRADED'|'COMMISSION'|'BALANCE_CHANGE'|'TARGET'|'RISK',
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
    dispatchAction: 'ENTRY'|'EXIT'|'TAKE_PROFIT'|'STOP_LOSS'|'AMOUNT_TRADED'|'COMMISSION'|'BALANCE_CHANGE'|'TARGET'|'RISK',
  ) => void,
}

export type AmountTradedProps = {
  handleInputChange: (
    input: number,
    dispatchAction: 'ENTRY'|'EXIT'|'TAKE_PROFIT'|'STOP_LOSS'|'AMOUNT_TRADED'|'COMMISSION'|'BALANCE_CHANGE'|'TARGET'|'RISK',
  ) => void,
  tradeState: TradePage,
}

export type InputChangeAsProp = {
  tradeState: TradePage,
  handleInputChange: (
    input: number | string,
    dispatchAction: 'RATING' | 'TRADE_RETURN' | 'DIRECTION' | 'TRADE_RETURN'
  ) => void,
}

export type LogTradeButtonProps = {
  isEditingTrade: boolean,
}

export type DeleteConfirmationProps = {
  updateLongPressed: (value: boolean) => void,
  updateSelectedTrades: (id: number, action: 'add' | 'remove' | 'clear') => void,
}

export type FilterModalProps = {
  bottomSheetRef: React.RefObject<BottomSheetModal>,
}

export type DateTimeSelectorProps = {
  showModal: boolean,
  initialTime: number,
  title?: string
  setShowModal: (value: boolean) => void,
  onTimeChange: (selectedTime: number) => void,
  mode: 'Date' | 'DateTime' | 'DateRange',
}

export type ScrollerProps = {
  initialTime: number,
  selectedDate: Date,
  createTime: ({ hours, minutes }: {
    hours?: number;
    minutes?: number;
  }) => void,
  updatePartOfDay: (value: "AM" | "PM") => void,
  partOfDay: 'AM' | 'PM',
  timeObj: { hours: number; minutes: number }
}