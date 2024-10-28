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
  updateFilters: (filter: string | string[], action: 'remove' | 'add' | 'clear', scrollViewRef?: React.RefObject<ScrollView>) => void,
}

export type FilterItemProps = {
  filterText: string,
  changeFilter: (filter: string | string[], action: 'remove' | 'add' | 'clear', scrollViewRef?: React.RefObject<ScrollView>) => void,
  scrollViewRef: React.RefObject<ScrollView>,
}