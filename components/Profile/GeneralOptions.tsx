import { Pressable, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import ProfileButton from './ProfileButton'

const GeneralOptions = () => {
  return (
    <View>
      <View className='flex-row justify-between items-center mt-3 mx-2'>
        <Text className='text-dark-2 font-medium text-lg'>Balance History</Text>
        <ProfileButton
          text='$100,000'
          icon='history'
          buttonAction={() => {
            console.log('account balance history')
          }}
        />
      </View>

      <View className='flex-row justify-between items-center mt-3 mx-2'>
        <Text className='text-dark-2 font-medium text-lg'>Break Even Buffer</Text>
        <ProfileButton
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
          <ProfileButton
            text='Dark'
            buttonAction={() => {
              console.log('dark mode')
            }}
          />
          <ProfileButton
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