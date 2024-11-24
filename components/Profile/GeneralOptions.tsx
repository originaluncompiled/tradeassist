import { Text, View } from 'react-native'
import React from 'react'
import Button from '../Button'

const GeneralOptions = () => {
  return (
    <View>
      <View className='flex-row justify-between items-center mt-3 mx-2'>
        <Text className='text-dark-2 font-medium text-lg'>Balance History</Text>
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
      
      {/* <ThemeProvider /> OR SOME OTHER WAY TO SWITCH BETWEEN LIGHT/DARK MODE */}
      <View className='flex-row justify-between items-center my-3 mx-2'>
        <Text className='text-dark-2 font-medium text-lg'>App Theme</Text>
        <View className='flex-row justify-center items-center'>
          {/* TO-DO: BRING UP PAGE/MODAL ABOUT TRANSACTION HISTORY */}
          <Button
            text='Dark'
            buttonAction={() => {
              console.log('dark mode')
            }}
            customClasses='mr-2 bg-dark-6'
          />
          <Button
            text='Light'
            buttonAction={() => {
              console.log('light mode')
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default GeneralOptions