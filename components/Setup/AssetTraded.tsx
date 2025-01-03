import { View } from 'react-native'
import Button from '../Button'
import { SetupStepProps } from '@/constants/types'

const AssetTraded = ({ accountInfo, updateAccountInfo }: SetupStepProps) => {  
  return (
    <View className='flex-row flex-wrap justify-evenly'>
      <Button
        text='Forex'
        type='large'
        // When the user switches between assets, we want to make sure that the list gets cleared, so that unnecessary info doesn't get added to the db when they create an account
        buttonAction={() => updateAccountInfo({ market: 'Forex', assets: [] })}
        customClasses={`mr-2 ${accountInfo.market === 'Forex' ? 'bg-dark-5' : 'bg-dark-6'}`}
      />
      <Button
        text='Futures'
        type='large'
        buttonAction={() => updateAccountInfo({ market: 'Futures', assets: [] })}
        customClasses={`mr-2 ${accountInfo.market === 'Futures' ? 'bg-dark-5' : 'bg-dark-6'}`}
      />
      <Button
        text='Stocks'
        type='large'
        buttonAction={() => updateAccountInfo({ market: 'Stocks', assets: [] })}
        customClasses={`mr-2 ${accountInfo.market === 'Stocks' ? 'bg-dark-5' : 'bg-dark-6'}`}
      />
      <Button
        text='Crypto'
        type='large'
        buttonAction={() => updateAccountInfo({ market: 'Crypto', assets: [] })}
        customClasses={`mr-2 ${accountInfo.market === 'Crypto' ? 'bg-dark-5' : 'bg-dark-6'}`}
      />
    </View>
  )
}

export default AssetTraded