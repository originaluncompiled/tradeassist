import { View, Text, TextInput } from 'react-native'
import { colors } from '@/constants/colors'
import AssetTraded from './AssetTraded'
import { SetupStepProps } from '@/constants/types'
import DropDownPicker from 'react-native-dropdown-picker'
import { useEffect, useState } from 'react'
import { countryCurrencyCodes } from '@/constants/country-currency-codes'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const StepOne = ({ updateAccountInfo, accountInfo }: SetupStepProps) => {
  const [open, setOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(accountInfo.currencyCode);
  useEffect(() => {
    updateAccountInfo({ currencyCode: dropdownValue })
  }, [dropdownValue])

  const [items] = useState(countryCurrencyCodes);

  return (
    <View className='flex-1 mt-2'>
      <View className='mb-10'>
        <Text className='text-dark-2 font-semibold text-2xl'>Account Name:</Text>
        <TextInput
          className='text-dark-1 text-lg border-b border-dark-3 px-2 h-12'
          value={accountInfo.accountName}
          placeholder='Account 1'
          placeholderTextColor={colors.dark.neutral_3}
          selectionColor={`${colors.green_2}B4`}
          onChangeText={(text) => updateAccountInfo({ accountName: text })}
        />
      </View>

      <View className='mb-10'>
        <Text className='text-dark-2 font-semibold text-2xl mb-2'>Account Currency:</Text>
        <DropDownPicker
          open={open}
          value={dropdownValue}
          items={items}
          setOpen={setOpen}
          setValue={setDropdownValue}
          placeholder={accountInfo.currencyCode}
          style={{ backgroundColor: colors.dark.neutral_6, borderColor: colors.dark.neutral_5 }}
          textStyle={{ color: colors.dark.neutral_1, fontSize: 16 }}
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
      </View>

      <View className='mb-10'>
        <Text className='text-dark-2 font-semibold text-2xl'>Starting Account Balance:</Text>
        <TextInput
          className='text-dark-1 text-lg border-b border-dark-3 px-2 h-12'
          value={accountInfo.startingAccountBalance.toString()}
          placeholder='1000.00'
          placeholderTextColor={colors.dark.neutral_3}
          selectionColor={`${colors.green_2}B4`}
          inputMode='numeric'
          onChangeText={(text) => updateAccountInfo({ startingAccountBalance: text })}
        />
      </View>
      
      <View>
        <Text className='text-dark-2 font-semibold text-2xl'>Market:</Text>
        <AssetTraded accountInfo={accountInfo} updateAccountInfo={updateAccountInfo}/>
      </View>
    </View>
  )
}

export default StepOne