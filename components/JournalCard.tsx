import { View, Text, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { JournalCardProps } from '@/constants/types'

const JournalCard = ({ journalInfo }: JournalCardProps) => {
  return (
    <View className='mx-4 my-2'>
      <Pressable
        className='flex-1 rounded-2xl px-4 pb-4 active:bg-dark-6 bg-dark-7 border border-dark-6 mx-[2px]'
        onPress={() => {
          // FUNCTION
        }}
      >
        <View className='flex-1 flex-row justify-between pt-2'>
          <View className='flex-row items-center'>
            <Text className='text-dark-1 font-bold text-2xl'>
              {`${journalInfo.date[0]}/${journalInfo.date[1]}/${journalInfo.date[2]}`}
            </Text>
            <Text className='text-dark-2 font-bold italic text-xl'>
              &nbsp;- {journalInfo.asset}
            </Text>
          </View>
          {/* A bookmark icon indicating win/loss/break even */}
          <View className='absolute -top-2.5 right-0'>
            <MaterialCommunityIcons
              name={journalInfo.snippet? 'bookmark' : 'pen-plus'}
              size={journalInfo.snippet? 38 : 20}
              color={journalInfo.status === 'Win' ?
                colors.accent_green
                : (journalInfo.status === 'Loss' ?
                colors.accent_red : colors.dark.neutral_3)}
              />
          </View>
        </View>
        {/* A snippet from the "Notes/Takeaways" section in the actual journal */}
        <Text className='text-dark-3 font-medium pt-2' numberOfLines={4}>{journalInfo.snippet? journalInfo.snippet : 'No Notes Found!'}</Text>
      </Pressable>
    </View>
  )
}

export default JournalCard

// Have red dot on navbair icon when there's unjournaled trades
// ^ If there aren't any just say underneath that heading, "You've journaled all your trades :)"