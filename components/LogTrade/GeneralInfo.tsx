import { Platform, Pressable, TextInput, View } from 'react-native'
import { useEffect, useState } from 'react'
import Button from '../Button'
import { colors } from '@/constants/colors'
import { useTradeContext } from '@/hooks/useTradeContext'
import DateTimeSelector from '../DateTimeSelector/DateTimeSelector'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker'
import { useSQLiteContext } from 'expo-sqlite'
import { useUserSettings } from '@/hooks/useUserSettings'

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

  const { accountId } = useUserSettings();
  const [items, setItems] = useState<ItemType<string>[]>([]);

  const db = useSQLiteContext();
  const fetchAssets = async () => {
    try {
      const result: { accountId: number, assetName: string, id: number }[] = await db.getAllAsync('SELECT * FROM assets WHERE accountId = ?', [accountId]);
      
      const resultArray = result.map(asset => {return { label: asset.assetName, value: asset.assetName }}) || [];
      setItems(resultArray);
    } catch (error) {
      console.log('Error fetching trade info: ', error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [])

  const [assetInput, setAssetInput] = useState<'input' | 'dropdown'>('input');
  useEffect(() => setAssetInput(items.findIndex(item => item.value === asset) > -1 ? 'dropdown' : 'input'), [items])

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(tradeState.asset);
  useEffect(() => {
    onAssetChange(dropdownValue);
  }, [dropdownValue])

  return (
    <View className=' flex-1 flex-row flex-wrap justify-between p-4 my-2 rounded-2xl border border-dark-6 bg-dark-7'>
      <Button
        text={dateValue.toLocaleDateString()}
        buttonAction={() => setShow(true)}
      />
      {show && (
        <DateTimeSelector mode='Date' initialTime={dateValue.getTime()} showModal={show} setShowModal={setShow} onTimeChange={onDateChange} title='Select Date' />
      )}

      <View className='flex-1 flex-row items-center justify-end'>
        {items.length > 0 && 
          <Pressable className='mr-2' onPress={() => setAssetInput(assetInput === 'dropdown' ? 'input' : 'dropdown')}>
            <MaterialCommunityIcons name={assetInput === 'dropdown' ? 'keyboard-outline' : 'format-list-group'} size={28} color={colors.dark.neutral_3} />
          </Pressable>
        }

        {assetInput === 'dropdown' && items.length > 0 ? (
          <DropDownPicker
            open={dropdownOpen}
            value={dropdownValue}
            items={items}
            setOpen={setDropdownOpen}
            setValue={setDropdownValue}
            placeholder='Asset'
            listMode='SCROLLVIEW'
            containerStyle={{ width: '65%' }}
            style={{ backgroundColor: colors.dark.neutral_6, borderColor: colors.dark.neutral_5 }}
            textStyle={{ color: colors.dark.neutral_1, fontSize: 16, fontWeight: 600 }}
            dropDownContainerStyle={{ backgroundColor: colors.dark.neutral_6, borderColor: colors.dark.neutral_5 }}
            ArrowUpIconComponent={({ style }) => (
              <MaterialCommunityIcons name='arrow-up' size={20} color={colors.green_2} styles={style} />
            )}
            ArrowDownIconComponent={({ style }) => (
              <MaterialCommunityIcons name='arrow-down' size={20} color={colors.green_2} styles={style} />
            )}
            TickIconComponent={({ style }) => (
              <MaterialCommunityIcons name='check' size={20} color={colors.green_2} styles={style} />
            )}
          />
        ) : (
          <TextInput
            value={asset}
            onChangeText={(text) => onAssetChange(text)}
            placeholder='Asset'
            placeholderTextColor={colors.dark.neutral_3}
            selectionColor={`${colors.green_2}B4`}
            multiline={Platform.OS === "ios" ? false : true} // for some reason fixes the placeholder dissapearing on Android when swiping
            scrollEnabled={false}
            className='text-dark-1 font-bold text-lg border-b border-b-dark-3 px-2 w-32 h-14'
            maxLength={10}
            textAlign='center'
          />
        )}
      </View>
    </View>
  )
}

export default GeneralInfo