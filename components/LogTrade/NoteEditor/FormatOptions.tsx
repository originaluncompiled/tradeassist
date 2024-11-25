import { View } from 'react-native'
import React, { useEffect } from 'react'
import Button from '@/components/Button'
import { FormatOptionsProps } from '@/constants/types'

const FormatOptions = ({ selection }: FormatOptionsProps) => {
  const formatSelection = () => {
    
  }

  return (
    <View className='flex-row justify-between items-center'>
        <View className='flex-row pr-2'>
          <Button
            icon='format-bold'
            customClasses='bg-dark-6 mr-2 py-2'
            buttonAction={() => formatSelection()}
          />
          <Button
            icon='format-italic'
            customClasses='bg-dark-6 mr-2 py-2'
            buttonAction={() => formatSelection()}
          />
          <Button
            icon='format-underline'
            customClasses='bg-dark-6 py-2'
            buttonAction={() => formatSelection()}
          />
        </View>

        <Button
          icon='checkbox-marked'
          customClasses='bg-dark-6 py-2 px-2'
            buttonAction={() => formatSelection()}
        />

        <View className='flex-row pl-2'>
          <Button
            icon='format-list-bulleted'
            customClasses='bg-dark-6 mr-2 py-2'
            buttonAction={() => formatSelection()}
          />
          <Button
            icon='format-list-numbered'
            customClasses='bg-dark-6 py-2'
            buttonAction={() => formatSelection()}
          />
        </View>
      </View>
  )
}

export default FormatOptions