import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import { useSQLiteContext } from 'expo-sqlite'
import { router } from 'expo-router'
import useDisplayDelete from '@/hooks/useDisplayDelete'
import { useTradeContext } from '@/hooks/useTradeContext'

const DeleteConfirmation = () => {
  const { tradeState } = useTradeContext();

  const db = useSQLiteContext();
  const deleteTrade = async (tradeId: number) => {
    try {
      await db.runAsync('DELETE FROM trades WHERE id = ?', [tradeId]);
    
      router.dismiss();
    } catch (error) {
      console.log('Couldn\'t Delete Trade: ', error)
    }
  }

  const {showModal, setShowModal} = useDisplayDelete();

  return (
    <Modal
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      animationType='fade'
      transparent
    >
      <Pressable className='flex-1 justify-center items-center bg-dark-8/50'
        onPress={() => setShowModal(false)}
      >
        <View className='border-2 border-dark-6 rounded-2xl p-4 bg-dark-7 w-3/4'>
          <Text className='text-dark-2 italic font-semibold text-2xl pb-1'>Are You Sure?</Text>
          <Text className='font-medium text-lg'>
            <Text className='text-dark-1'>Do you really want to delete this trade? </Text>
            <Text className='text-accent-red'>This cannot be undone!</Text>
          </Text>
          <View className='flex-row items-center justify-end mt-4'>
            <Pressable
              className='px-2 py-1 mr-4 rounded-lg border border-dark-3 bg-dark-3/10 active:bg-dark-3/60'
              onPress={() => setShowModal(false)}
            >
              <Text className='text-lg font-medium text-dark-3'>Cancel</Text>
            </Pressable>
            <Pressable
              className='px-2 py-1 rounded-lg border border-accent-red bg-accent-red/20 active:bg-accent-red/60'
              onPress={() => {
                setShowModal(false);
                deleteTrade(tradeState.id ? tradeState.id : 0);
              }}
            >
              <Text className='text-lg  font-medium text-accent-red'>Delete</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}

export default DeleteConfirmation