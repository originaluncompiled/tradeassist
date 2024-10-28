import { View, Text, Pressable } from 'react-native'
import { colors } from '@/constants/colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { FilterItemProps } from '@/constants/types'

const FilterItem = ({ filterText, changeFilter, scrollViewRef }: FilterItemProps) => {
  return (
    <View className='flex flex-row items-center bg-dark-6 border border-dark-5 px-2 py-1 mx-2 rounded-full'>
      <Text className='text-md text-dark-2'>
        {filterText}
      </Text>

      <Pressable onPress={() => {
        changeFilter(filterText, 'remove', scrollViewRef);
      }}>
        <MaterialCommunityIcons className='pl-1' name='close' size={16} color={colors.dark.neutral_2} />
      </Pressable>
    </View>
  )
}

export default FilterItem