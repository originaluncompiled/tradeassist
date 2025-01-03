import { Platform, TextInput, View } from 'react-native'
import { useState } from 'react'
import Button from '../Button'
import { colors } from '@/constants/colors'
import { useTradeContext } from '@/hooks/useTradeContext'
import DateTimeSelector from '../DateTimeSelector/DateTimeSelector'

const GeneralInfo = () => {
  const { tradeState, dispatch } = useTradeContext();
  const { date, asset } = tradeState;

  // Makes sure that the date object is actually a date and not just some weird string,
  // preventing an 'undefined value' error
  const [dateValue, setDateValue] = useState(new Date(date));

  const [show, setShow] = useState(false);

  const onDateChange = (date: number) => {
    const selectedDate = new Date(date) || new Date;

    dispatch({
      type: 'DATE',
      payload: selectedDate
    });
    setDateValue(selectedDate);
    setShow(false);
  };

  const onAssetChange = (text: string) => {
    dispatch({
      type: 'ASSET',
      payload: text,
    })
  }

  return (
    <View className='p-4 rounded-2xl my-2 border border-dark-6 bg-dark-7'>
      <View className='flex-row justify-between'>
        <Button
          text={dateValue.toLocaleDateString()}
          buttonAction={() => setShow(true)}
        />
        {show && (
          <DateTimeSelector mode='Date' initialTime={dateValue.getTime()} showModal={show} setShowModal={setShow} onTimeChange={onDateChange} title='Select Date' />
        )}
        <TextInput
          value={asset}
          onChangeText={(text) => onAssetChange(text)}
          placeholder='Asset'
          placeholderTextColor={colors.dark.neutral_3}
          selectionColor={`${colors.green_2}B4`}
          multiline={Platform.OS === "ios" ? false : true} // for some reason fixes the placeholder dissapearing on Android when swiping
          scrollEnabled={false}
          className='text-dark-1 font-bold text-lg border-b border-dark-3 px-2 w-32 h-14'
          maxLength={8}
          textAlign='center'
        />
      </View>
    </View>
  )
}

export default GeneralInfo