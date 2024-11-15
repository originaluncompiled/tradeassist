import { Text, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { ProfileButtonProps } from '@/constants/types'

const ProfileButton = ({ buttonAction, icon, text, type }: ProfileButtonProps) => {
  return (
    <Pressable
      className={`flex-row items-center justify-left ml-2 border rounded-lg bg-dark-6 border-dark-5 active:bg-dark-5 ${type === 'large' ? 'p-3 my-2' : 'pl-3 pr-4 py-1 '}`}
      onPress={() => {
        if (!buttonAction) {
          console.log('Error: No valid button action found.')
          return
        }
        buttonAction()
      }}
    >
      <MaterialCommunityIcons name={icon} size={18} color={colors.dark.neutral_1} />
      <Text className='text-dark-1 text-lg font-bold pl-2'>{text}</Text>
    </Pressable>
  )
}

export default ProfileButton