import { Alert, Keyboard, View } from 'react-native'
import Button from '@/components/Button'
import { router } from 'expo-router'
import { useState } from 'react'
import ProgressBar from '@/components/Setup/ProgressBar'
import StepOne from '@/components/Setup/StepOne'
import StepTwo from '@/components/Setup/StepTwo'
import WarningModal from '@/components/Setup/WarningModal'
import { useSQLiteContext } from 'expo-sqlite'

const setup = () => {
  // Prevents the navigation buttons from being above the keyboard when it's is open
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
  Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

  const [setupProgress, setSetupProgress] = useState<1 | 2>(1);
  const [accountInfo, setAccountInfo] = useState<{
    accountName: string,
    currencyCode: string,
    // we want the user to still be able to make the textinput blank if they wanted to
    startingAccountBalance: string,
    market: 'Forex' | 'Futures' | 'Stocks' | 'Crypto',
    // we want the user to still be able to make the textinput blank if they wanted to
    assets: {assetName: string, contractSize?: string, pipSize?: string}[]
  }>({ accountName: '', currencyCode: '', startingAccountBalance: '', market: 'Forex', assets: [] });
  const updateAccountInfo = (info: Partial<typeof accountInfo>) => setAccountInfo({...accountInfo, ...info});

  const db = useSQLiteContext();
  const [show, setShow] = useState(false);
  const updateShowModal = (value: boolean) => setShow(value);

  const handleFinishSetup = async () => {
    if (
      accountInfo.accountName === '' || accountInfo.accountName === ' ' ||
      accountInfo.currencyCode === '' || accountInfo.currencyCode === ' ' ||
      accountInfo.startingAccountBalance === '' || accountInfo.startingAccountBalance === ' '
    ) {
      updateShowModal(true);
      return;
    }
    try {
      let newAccountId = 0;
      await db.withTransactionAsync(async () => {
        const accountsResult = await db.runAsync(
          `INSERT INTO accounts (
            name,
            currency,
            market,
            startingBalance
          )
          VALUES (?, ?, ?, ?)`, 
          [
            accountInfo.accountName,
            accountInfo.currencyCode,
            accountInfo.market,
            accountInfo.startingAccountBalance,
          ]
        );
        newAccountId = accountsResult.lastInsertRowId;
      });

      if (newAccountId === 0) return;
      
      for (const asset of accountInfo.assets) {
        await db.withTransactionAsync(async () => {
          if (accountInfo.market === 'Forex' && asset.pipSize) {
            await db.runAsync(
              `INSERT INTO assets (
                accountId,
                assetName,
                pipSize
              )
              VALUES (?, ?, ?)`, 
              [
                newAccountId,
                asset.assetName,
                asset.pipSize
              ]
            );
          } else if (accountInfo.market === 'Futures' && asset.contractSize) {
            await db.runAsync(
              `INSERT INTO assets (
                accountId,
                assetName,
                contractSize
              )
              VALUES (?, ?, ?)`, 
              [
                newAccountId,
                asset.assetName,
                asset.contractSize
              ]
            );
          } else if (accountInfo.market === 'Crypto' || accountInfo.market === 'Stocks') {
            await db.runAsync(
              `INSERT INTO assets (
                accountId,
                assetName
              )
              VALUES (?, ?)`, 
              [
                newAccountId,
                asset.assetName
              ]
            );
          }
        });
      }

      router.dismissTo({ pathname: '/', params: { newAccountId: newAccountId } });
    } catch (error) {
      console.log('Error writing trade:', error);
    }
  }

  return (
    <View className='flex-1 m-10'>
      {show && <WarningModal showModal={show} updateShowModal={updateShowModal} />}
      <ProgressBar setupProgress={setupProgress}/>
      {setupProgress === 1 ?
        <StepOne updateAccountInfo={updateAccountInfo} accountInfo={accountInfo} />
        : <StepTwo updateAccountInfo={updateAccountInfo} accountInfo={accountInfo} />
      }

      {!keyboardVisible &&
        <View className='flex-row justify-between'>
          <Button text='Cancel' customClasses='bg-dark-6 px-4 py-2' buttonAction={() => router.dismissTo('/')} />
          <View className='flex-row'>
            {setupProgress === 2 &&
            <Button text='Back' customClasses='mr-4 bg-dark-6 px-4 py-2' buttonAction={() => {
              if (setupProgress === 2) setSetupProgress(1);
            }} />}

            <Button
              text={setupProgress === 1 ? 'Next' : 'Finish'}
              customClasses='bg-dark-6 px-4 py-2'
              buttonAction={() => {
                if (setupProgress === 1) {
                  setSetupProgress(2);
                } else {
                  handleFinishSetup();
                }
              }}
            />
          </View>
        </View>
      }
    </View>
  )
}

export default setup