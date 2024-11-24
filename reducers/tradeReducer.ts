import { TradeAction, TradePage } from "@/constants/types"

export const initialTrade: TradePage = {
  tradeReturn: 0,
  tradeOutcome: 'BREAK EVEN',
  direction: 'Long',
  rating: 0,
  balanceChange: 0,
  entry: 0,
  exit: 0,
  takeProfit: 0,
  stopLoss: 0,
  amountTraded: 0,
  commission: 0,
}

export const tradeReducer = (state: TradePage, action: TradeAction): TradePage => {
  switch (action.type) {
    case 'TRADE_RETURN': {
      return {
        ...state,
        tradeReturn: action.payload
      };
    }
    case 'TRADE_OUTCOME': {
      return {
        ...state,
        tradeOutcome: action.payload
      };
    }
    case 'DIRECTION': {
      return {
        ...state,
        direction: action.payload
      };
    }
    case 'RATING': {
      return {
        ...state,
        rating: action.payload
      };
    }
    case 'BALANCE_CHANGE': {
      return {
        ...state,
        balanceChange: action.payload
      };
    }
    case 'ENTRY': {
      return {
        ...state,
        entry: action.payload
      };
    }
    case 'EXIT': {
      return {
        ...state,
        exit: action.payload
      };
    }
    case 'TAKE_PROFIT': {
      return {
        ...state,
        takeProfit: action.payload
      };
    }
    case 'STOP_LOSS': {
      return {
        ...state,
        stopLoss: action.payload
      };
    }
    case 'AMOUNT_TRADED': {
      return {
        ...state,
        amountTraded: action.payload
      };
    }
    case 'COMMISSION': {
      return {
        ...state,
        commission: action.payload
      };
    }
  }
}