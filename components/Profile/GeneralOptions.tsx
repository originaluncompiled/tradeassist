import { Text, View } from 'react-native'
import React from 'react'
import Button from '../Button'

const GeneralOptions = () => {
  return (
    <View>
      <View className='flex-row justify-between items-center mt-3 mx-2'>
        <Text className='text-dark-2 font-medium text-lg'>Balance History</Text>
        {/* TO-DO: MAKE A PAGE ABOUT TRANSACTION HISTORY */}
        <Button
          text='$100,000'
          icon='history'
          buttonAction={() => {
            console.log('account balance history')
          }}
        />
      </View>

      <View className='flex-row justify-between items-center mt-3 mx-2'>
        <Text className='text-dark-2 font-medium text-lg'>Break Even Buffer</Text>
        <Button
          text='0%'
          icon='arrow-expand-horizontal'
          buttonAction={() => {
            console.log('break even buffer')
          }}
        />
      </View>
    </View>
  )
}

export default GeneralOptions