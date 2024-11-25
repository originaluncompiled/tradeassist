import { Text, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { ButtonProps } from '@/constants/types'

const Button = ({ buttonAction, icon, text, type, customClasses }: ButtonProps) => {
  return (
    <Pressable
      className={`flex-row items-center justify-left border rounded-lg border-dark-5 active:bg-dark-5 ${type === 'large' ? 'p-3 my-2' : 'pl-2 pr-3 py-1'} ${customClasses ? customClasses : 'bg-dark-6'}`}
      onPress={() => {
        if (!buttonAction) {
          console.log('Error: No valid button action found.')
          return
        }
        buttonAction()
      }}
    >
      {icon && <MaterialCommunityIcons name={icon} size={18} color={colors.dark.neutral_1} style={{ paddingLeft: 4}} />}
      {text && <Text className='text-dark-1 text-lg font-bold pl-2'>{text}</Text>}
    </Pressable>
  )
}

export default Button