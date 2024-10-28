import { View, Text } from 'react-native';
import React from 'react';

type AccountOverviewProps = {
  timeline: string,
};

const AccountOverview = ({ timeline }: AccountOverviewProps ) => {
  const account = {
    balance: '$128,043.67',
    return: '+$28,043.67',
  };

  return (
    <View className='px-3 py-2 border-2 rounded-2xl m-4 bg-green-2/75 border-green-2'>
      
      <Text className='text-lg text-dark-2'>Account Balance</Text>
      <Text className='font-bold text-5xl pt-1 text-dark-1'>
        {account.balance}
      </Text>

      <View className='flex-row items-center justify-between pt-1'>
        <Text className='text-lg text-dark-2'>{timeline}</Text>
        <Text className={`font-bold text-2xl ${account.return[0] === '+' ? 'text-accent-green' : 'text-accent-red'}`}>
          {account.return}
        </Text>
      </View>

    </View>
  )
}

export default AccountOverview