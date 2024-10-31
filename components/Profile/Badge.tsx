import { BadgeProps } from '@/constants/types'
import { Text, Pressable } from 'react-native'

const Badge = ({ color, emoji, badgeText }: BadgeProps) => {
  // USE A MODAL FOR THE TOOLTIP
  return (
    <Pressable
      className={`px-3 py-2 my-2 border-2 rounded-lg m-1`}
      style={{ backgroundColor: `${color}B4`, borderColor: color }}
    >
      <Text className='text-dark-1 font-medium'>{emoji} {badgeText}</Text>
    </Pressable>
  )
}

export default Badge