import { Text, View } from 'react-native'
import Button from '../Button'
import { useUserSettings } from '@/hooks/useUserSettings';
import { router } from 'expo-router';
import BreakEvenModal from './BreakEvenModal';
import { useState } from 'react';

const GeneralOptions = () => {
  const { market, startingBalance, currency, breakEvenBuffer } = useUserSettings();
  const [showBreakEven, setShowBreakEven] = useState(false);
  const updateShowBreakEven = (value: boolean) => setShowBreakEven(value);

  return (
    <View>
      {showBreakEven && <BreakEvenModal showModal={showBreakEven} updateShowModal={updateShowBreakEven} />}
      <View className='flex-row justify-between items-center mt-3 mx-2'>
        <Text className='text-dark-2 font-medium text-lg'>Balance History</Text>
        <Button
          text={startingBalance?.toLocaleString('en-US', { style: 'currency', currency: currency }) || (0).toLocaleString('en-US', { style: 'currency', currency: currency })}
          icon='history'
          buttonAction={() => {
            router.push('/profile-pages/balancehistory')
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
          text={`${breakEvenBuffer}%`}
          icon='arrow-expand-horizontal'
          buttonAction={() => {
            updateShowBreakEven(true);
          }}
        />
      </View>
    </View>
  )
}

export default GeneralOptions