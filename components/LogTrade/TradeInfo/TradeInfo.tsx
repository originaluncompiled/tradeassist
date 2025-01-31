import { View } from 'react-native'
import MoneyInput from './MoneyInput'
import Separator from '@/components/Separator'
import AmountTraded from './AmountTraded'
import RiskReward from './RiskReward'
import { useTradeContext } from '@/hooks/useTradeContext'

const TradeInfo = () => {
  const { tradeState, dispatch } = useTradeContext();

  const handleInputChange = (
    payload: number,
    dispatchAction: 'ENTRY'|'EXIT'|'TAKE_PROFIT'|'STOP_LOSS'|'AMOUNT_TRADED'|'COMMISSION'|'BALANCE_CHANGE'|'TARGET'|'RISK',
  ) => {
    dispatch({
      payload: payload,
      type: dispatchAction,
    })
  }

  return (
    <View className='px-4 pb-4 pt-2 mb-4 rounded-2xl border border-dark-6 bg-dark-7'>
      <MoneyInput
        text='Entry Price'
        initialValue={tradeState.entry}
        handleInputChange={handleInputChange}
        dispatchAction='ENTRY'
      />
      <MoneyInput
        text='Exit Price'
        initialValue={tradeState.exit}
        handleInputChange={handleInputChange}
        dispatchAction='EXIT'
      />
      <MoneyInput
        text='Take Profit'
        initialValue={tradeState.takeProfit}
        handleInputChange={handleInputChange}
        dispatchAction='TAKE_PROFIT'
      />
      <MoneyInput
        text='Stop Loss'
        initialValue={tradeState.stopLoss}
        handleInputChange={handleInputChange}
        dispatchAction='STOP_LOSS'
      />
      <AmountTraded tradeState={tradeState} handleInputChange={handleInputChange}/>

      <Separator margin='mt-4 mb-1'/>

      <RiskReward
        handleInputChange={handleInputChange}
        tradeState={tradeState}
      />

      <Separator margin='mt-4 mb-1'/>
      
      <MoneyInput
        text='Commissions/Fees'
        initialValue={tradeState.commission}
        handleInputChange={handleInputChange}
        dispatchAction='COMMISSION'
      />
    </View>
  )
}

export default TradeInfo