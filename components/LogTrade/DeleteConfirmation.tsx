import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import { useSQLiteContext } from 'expo-sqlite';
import { router } from 'expo-router';
import useDisplayDelete from '@/hooks/useDisplayDelete';
import { useTradeContext } from '@/hooks/useTradeContext';

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
    <Modal style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} visible={showModal} onRequestClose={() => setShowModal(false)} animationType='fade' transparent>
      <View className='flex-1 justify-center items-center'>
        {/* Allows the user to just press anywhere on screen to dismiss */}
        {/* TO-DO: FIX, BECAUSE SOMETHING HERE IS CAUSING THE USER TO HAVE TO CLICK TWICE ON STUFF SOMETIMES */}
        <Pressable className='absolute w-full h-full bg-dark-8/40' onPressIn={() => setShowModal(false)}/>

        <View className='flex-1 justify-center items-center'>
          <View className='border-2 border-dark-6 rounded-2xl p-4 bg-dark-7 w-3/4'>
            <Text className='text-dark-2 italic font-semibold text-2xl pb-1'>Are You Sure?</Text>
            <Text className='font-medium text-lg'>
              <Text className='text-dark-1'>Do you really want to delete this trade? </Text>
              <Text className='text-accent-red'>This cannot be undone!</Text>
            </Text>
            <View className='flex-row items-center justify-around mt-4'>
              <Pressable
                className='px-2 py-1 border border-dark-3 bg-dark-3/10 active:bg-dark-3/60 rounded-lg'
                onPress={() => setShowModal(false)}
              >
                <Text className='text-lg font-medium text-dark-3'>Cancel</Text>
              </Pressable>
              <Pressable
                className='px-2 py-1 border border-accent-red bg-accent-red/20 active:bg-accent-red/60 rounded-lg'
                onPress={() => {
                  setShowModal(false);
                  deleteTrade(tradeState.id ? tradeState.id : 0);
                }}
              >
                <Text className='text-lg  font-medium text-accent-red'>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default DeleteConfirmation