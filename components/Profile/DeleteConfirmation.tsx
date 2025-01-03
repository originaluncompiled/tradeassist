import { View, Text, Modal, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite'
import { router } from 'expo-router'
import { DeleteConfirmationProps } from '@/constants/types'
import { useUserSettings } from '@/hooks/useUserSettings'

const DeleteConfirmation = ({ showModal, setShowModal }: DeleteConfirmationProps) => {
  const { setAccountId, accountId } = useUserSettings();

  const db = useSQLiteContext();
  const deleteAccount = async () => {
    try {
      await db.runAsync('DELETE FROM accounts WHERE id = ?', [accountId]);
    
      setAccountId(0);
    } catch (error) {
      console.log('Couldn\'t Delete Account: ', error)
    }
  }
  // only go back to the accounts page after the account id has been reset, so that the user doesn't get redirected to the deleted account's stats page
  useEffect(() => {
    if (accountId === 0) {
      router.dismissTo('/');
    }
  }, [accountId]);

  const [count, setCount] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    if (count === 0) clearInterval(interval);
  }, []);

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
          <Text className='text-dark-1 font-semibold text-2xl pb-1'>Are You Sure?</Text>
          <Text className='font-medium text-lg'>
            <Text className='text-dark-3'>Do You really want to delete this account? You will lose all trades linked to it. </Text>
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
              className={`px-2 py-1 rounded-lg border border-accent-red bg-accent-red/20 ${count < 1 && 'active:bg-accent-red/60'}`}
              onPress={() => {
                if (count < 0) {
                  deleteAccount();
                }
              }}
            >
              <Text className='text-lg  font-medium text-accent-red'>{count + 1 > 0 ? `Wait (${count + 1})` : 'Delete'}</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}

export default DeleteConfirmation