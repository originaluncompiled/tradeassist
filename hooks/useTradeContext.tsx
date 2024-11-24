import { TradeContextType } from '@/constants/types';
import { createContext, useContext } from 'react'

export const TradeContext = createContext<TradeContextType | null>(null);

export const useTradeContext = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error('Could not find Context');
  }
  return context;
};