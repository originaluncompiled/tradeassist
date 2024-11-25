import { colors } from '@/constants/colors'
import { useTradeContext } from '@/hooks/useTradeContext';
import { useRef } from 'react';
import { View, TextInput } from 'react-native'

const Editor = () => {
  const { tradeState, dispatch } = useTradeContext();
  const editorRef = useRef<TextInput>(null);

  const handleTextChange = (text: string) => {
    dispatch({
      type: 'NOTES',
      payload: text
    })
  }

  // Prevents the editor from overflowing, becoming scrollable or adding extra unnecessary padding
  const adjustContentSize = (e: {nativeEvent: {contentSize: {width: number, height: number}}}) => {
    let height = Math.round(e.nativeEvent.contentSize.height);

    editorRef.current?.setNativeProps({style: {height: height}});
  }
  
  return (
    <View className='mt-2'>
      <TextInput
        ref={editorRef}
        value={tradeState.notes}
        onChangeText={(text) => handleTextChange(text)}
        multiline={true}
        scrollEnabled={false}
        maxLength={2000}
        numberOfLines={38}
        placeholder='Notes'
        textAlignVertical='top'
        placeholderTextColor={colors.dark.neutral_4}
        selectionColor={`${colors.green_2}B4`}
        className='bg-dark-6 rounded-lg border border-dark-5 p-2 text-lg color-dark-1'
        onContentSizeChange={(e) => adjustContentSize(e)}
      />
    </View>
  )
}

export default Editor