import { View, Text, KeyboardAvoidingView, Pressable, ScrollView, Keyboard } from 'react-native'
import { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { useUserSettings } from '@/hooks/useUserSettings'
import AssetCard from '@/components/Profile/AssetCard'
import { useSQLiteContext } from 'expo-sqlite'

const editassets = () => {
  // Prevents the add button from being above the keyboard when it's is open
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
  Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

  const [assets, setAssets] = useState<{assetName: string, contractSize?: string, pipSize?: string}[]>([]);
  const updateAssets = (info: typeof assets) => setAssets([...info]);

  const { market, accountId } = useUserSettings();
  const db = useSQLiteContext();
  const fetchAssets = async () => {
    try {
      const result = await db.getAllAsync('SELECT * FROM assets WHERE accountId = ?', [accountId]);
      console.log(result)
      // setAssets(result);
    } catch (error) {
      console.log('Error fetching trade info: ', error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [])

  return (
    <View className='flex-1 bg-dark-8 px-8'>
      <KeyboardAvoidingView className='flex-1 mt-5' behavior='padding'>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
          {
            assets.map((asset, index) => (
              <AssetCard key={index} id={index} market={market} assets={assets} updateAssets={updateAssets} />
            ))
          }
        </ScrollView>
      </KeyboardAvoidingView>
      
      {!keyboardVisible &&
        <View>
          <Pressable
            className='flex-row items-center justify-center p-3 mb-5 mt-5 border border-dashed rounded-lg border-dark-6 bg-dark-7/50 active:bg-dark-6/50'
            onPress={() => {
              // TO-DO: If they switch markets, clear the assets array
              if (market === 'Forex') {
                updateAssets([...assets, { assetName: '', pipSize: '' }] )
              } else if (market === 'Futures') {
                updateAssets([...assets, { assetName: '', contractSize: '' }] )
              } else {
                updateAssets([...assets, { assetName: '' }] )
              }
            }}
          >
            <MaterialCommunityIcons name='plus-thick' size={18} color={colors.dark.neutral_3} style={{ paddingLeft: 4, paddingRight: 8}} />
            <Text className='text-dark-3 text-lg font-bold'>
              Add {market === 'Forex' ? 'Pair'
                : market === 'Futures' ? 'Contract'
                : market === 'Crypto' ? 'Coin'
                : 'Stock'}
            </Text>
          </Pressable>
          
          <Pressable
            className='rounded-lg mb-4 bg-green-2/75 active:bg-green-2 border-2 border-green-2'
            onPress={() => {
              console.log('save pairs')
            }}
          >
            <Text className='text-lg text-dark-7 font-bold text-center p-3'>
              Save {market === 'Forex' ? 'Pairs'
                : market === 'Futures' ? 'Contracts'
                : market === 'Crypto' ? 'Coins'
                : 'Stocks'}
            </Text>
          </Pressable>
        </View>
      }
    </View>
  )
}

export default editassets