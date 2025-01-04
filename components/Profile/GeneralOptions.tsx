import { Text, View } from 'react-native'
import Button from '../Button'
import { useUserSettings } from '@/hooks/useUserSettings';
import { router } from 'expo-router';

const GeneralOptions = () => {
  const { market, startingBalance, currency } = useUserSettings();

  return (
    <View>
      <View className='flex-row justify-between items-center mt-3 mx-2'>
        <Text className='text-dark-2 font-medium text-lg'>Balance History</Text>
        <Button
          text={startingBalance?.toLocaleString('en-US', { style: 'currency', currency: currency }) || (0).toLocaleString('en-US', { style: 'currency', currency: currency })}
          icon='history'
          buttonAction={() => {
            console.log('account balance history page')
          }}
        />
      </View>

      <View className='flex-row justify-between items-center mt-3 mx-2'>
        <Text className='text-dark-2 font-medium text-lg'>
          Edit {market === 'Forex' ? 'Pairs'
          : market === 'Futures' ? 'Contracts'
          : market === 'Crypto' ? 'Coins'
          : 'Stocks'}
        </Text>
        <Button
          text='Edit'
          icon='playlist-edit'
          buttonAction={() => {
            router.push('/profile-pages/editassets')
          }}
        />
      </View>

      <View className='flex-row justify-between items-center mt-3 mx-2'>
        <Text className='text-dark-2 font-medium text-lg'>Break Even Buffer</Text>
        <Button
          text='0%'
          icon='arrow-expand-horizontal'
          buttonAction={() => {
            console.log('break even buffer modal')
          }}
        />
      </View>
    </View>
  )
}

export default GeneralOptions