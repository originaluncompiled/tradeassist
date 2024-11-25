import { TradeAction, TradePage } from "@/constants/types"

export const initialTrade: TradePage = {
  asset: '',
  date: new Date(),
  assetType: 'Stocks',
  tradeReturn: 0,
  tradeOutcome: 'BREAK EVEN',
  direction: 'Long',
  rating: 0,
  balanceChange: 0,
  takeProfit: 0,
  stopLoss: 0,
  target: 0,
  risk: 0,
  entry: 0,
  exit: 0,
  entryTime: Math.round(new Date().getTime() / 60000) * 60000, // initial load's time in hours
  exitTime: Math.round(new Date().getTime() / 60000) * 60000, // initial load's time in hours
  amountTraded: 0,
  commission: 0,
  notes: '',
}

export const tradeReducer = (state: TradePage, action: TradeAction): TradePage => {
  switch (action.type) {
    case 'ASSET': {
      return {
        ...state,
        asset: action.payload
      };
    }
    case 'DATE': {
      return {
        ...state,
        date: action.payload
      };
    }
    case 'ASSET_TYPE': {
      return {
        ...state,
        assetType: action.payload
      };
    }
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
    case 'TARGET': {
      return {
        ...state,
        target: action.payload
      };
    }
    case 'RISK': {
      return {
        ...state,
        risk: action.payload
      };
    }
    case 'ENTRY_TIME': {
      return {
        ...state,
        entryTime: action.payload
      };
    }
    case 'EXIT_TIME': {
      return {
        ...state,
        exitTime: action.payload
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
    case 'NOTES': {
      return {
        ...state,
        notes: action.payload
      };
    }
  }
}