import { Text, View } from 'react-native'
import Editor from './Editor'

const NoteEditor = () => {
  return (
    <View className='p-4 rounded-2xl mt-2 mb-[76px] border border-dark-6 bg-dark-7'>
      <Text className='text-dark-2 font-semibold text-lg'>Trade Notes:</Text>
      {/* <FormatOptions selection={selection}/> */}
      <Editor />
    </View>
  )
}

export default NoteEditor