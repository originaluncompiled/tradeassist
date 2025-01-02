import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import { WarningModalProps } from '@/constants/types'

const WarningModal = ({ showModal, updateShowModal }: WarningModalProps) => {
  return (
    <Modal
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      visible={showModal}
      onRequestClose={() => updateShowModal(false)}
      animationType='fade'
      transparent
    >
      <Pressable className='flex-1 justify-center items-center bg-dark-8/50'
        onPress={() => updateShowModal(false)}
      >
        <View className='border-2 border-dark-6 rounded-2xl p-4 bg-dark-7 w-3/4'>
          <Text className='text-dark-1 font-semibold text-2xl pb-1'>You Forgot Something</Text>
          <Text className='font-medium text-dark-3 mb-2'>Please make sure to fill in everything. Go back and check what you missed!</Text>
          <Pressable
            className='px-2 py-1 rounded-lg border border-dark-5 bg-dark-6 active:bg-dark-5'
            onPress={() => updateShowModal(false)}
          >
            <Text className='text-lg font-medium text-dark-3 text-center'>OK</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  )
}

export default WarningModal