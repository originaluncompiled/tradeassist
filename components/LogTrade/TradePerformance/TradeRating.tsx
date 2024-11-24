import { View, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { useEffect, useState } from 'react'
import { InputChangeAsProp } from '@/constants/types'

const TradeRating = ({ tradeState, handleInputChange }: InputChangeAsProp) => {
  const [ratingArray, setRatingArray] = useState<boolean[]>([]);

  const createStarRatingArray = (newRating: number) => {
    let updatedRatingArray: boolean[] = [false, false, false, false, false];

    for (let i = 0; i < 5; i++) {
      if (i + 1 <= newRating) {
        updatedRatingArray[i] = true
      } else if (i > newRating) {
        updatedRatingArray[i] = false
      }
    }
    setRatingArray(updatedRatingArray);
    handleInputChange(newRating, 'RATING');
  }

  useEffect(() => createStarRatingArray(tradeState.rating), [tradeState.rating])
  
  return (
    <View className='flex-row items-center'>
      {ratingArray.map((starFilled, i) => {
        return (
          <Pressable className='pr-1' hitSlop={4} onPress={() => handleInputChange(i+1, 'RATING')} key={i+1}>
            <MaterialCommunityIcons name={`${starFilled ? 'star' : 'star-outline'}`} color={colors.dark.neutral_1} size={20}/>
          </Pressable>
        )
      })}
    </View>
  )
}

export default TradeRating