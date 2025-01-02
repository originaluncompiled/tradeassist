import { View } from 'react-native'
import Button from '../Button'
import { AssetTradedProps } from '@/constants/types'

const AssetTraded = ({ accountInfo, updateAccountInfo }: AssetTradedProps) => {  
  return (
    <View className='flex-row flex-wrap justify-evenly'>
      <Button
        text='Forex'
        type='large'
        buttonAction={() => updateAccountInfo({ market: 'Forex' })}
        customClasses={`mr-2 ${accountInfo.market === 'Forex' ? 'bg-dark-5' : 'bg-dark-6'}`}
      />
      <Button
        text='Futures'
        type='large'
        buttonAction={() => updateAccountInfo({ market: 'Futures' })}
        customClasses={`mr-2 ${accountInfo.market === 'Futures' ? 'bg-dark-5' : 'bg-dark-6'}`}
      />
      <Button
        text='Stocks'
        type='large'
        buttonAction={() => updateAccountInfo({ market: 'Stocks' })}
        customClasses={`mr-2 ${accountInfo.market === 'Stocks' ? 'bg-dark-5' : 'bg-dark-6'}`}
      />
      <Button
        text='Crypto'
        type='large'
        buttonAction={() => updateAccountInfo({ market: 'Crypto' })}
        customClasses={`mr-2 ${accountInfo.market === 'Crypto' ? 'bg-dark-5' : 'bg-dark-6'}`}
      />
    </View>
  )
}

export default AssetTraded