import { Text, View } from 'react-native'

const Tools = () => {
  return (
    <View className='flex-1 justify-center items-center bg-dark-8 pt-4 pb-2'>
      <Text className='font-bold text-xl text-dark-1 text-center'>Trade Tools</Text>
      <Text className='font-bold text-base text-dark-1 text-center'>- 'Current Session' indicator + when the next session is</Text>
      <Text className='font-bold text-base text-dark-1 text-center'>^ local time + time in current session's location</Text>
      <Text className='font-bold text-base text-dark-1 text-center'>- Weekly News Calendar (With filters like forexfactory)</Text>
      <Text className='font-bold text-base text-dark-1 text-center'>- Position Size Calculator (Forex, Futures, etc.)</Text>
      <Text className='font-bold text-base text-dark-1 text-center'>- MAYBE Strategy Checklist</Text>
    </View>
  );
}

export default Tools