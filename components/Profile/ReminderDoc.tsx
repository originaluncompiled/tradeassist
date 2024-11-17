import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/constants/colors';
import ProfileButton from './ProfileButton';

const ReminderDoc = () => {
  const [reminderDoc, setReminderDoc] = useState(false);
  const enableReminderDoc = () => setReminderDoc(previousState => !previousState)

  return (
    <View className={`mx-2 ${reminderDoc && 'pb-3'}`}>
      <View className={`flex-row items-center justify-between mx-2 ${reminderDoc && '-mb-2'}`}>
        {/* (i) <- when pressed show tooltip: "Shows a document with things to keep in mind when *taking* a trade" */}
        <Text className='text-dark-2 font-medium text-lg'>Reminder Document</Text>
        <Switch 
          trackColor={{false: colors.dark.neutral_4, true: colors.green_2}}
          thumbColor={reminderDoc ? colors.green_4 : colors.dark.neutral_2}
          onValueChange={enableReminderDoc}
          value={reminderDoc}
        />
      </View>

      {
        reminderDoc &&
        <ProfileButton text='Import Notes to Remember' icon='file-document' type='large' buttonAction={() => console.log('reminder document')}/>
      }
    </View>
  )
}

export default ReminderDoc