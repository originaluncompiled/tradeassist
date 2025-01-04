import { create } from 'zustand'

type UserSettingsProps = {
  locale: string,
  setLocale: (value: string) => void,
  is24Hour: boolean,
  setIs24Hour: (value: boolean) => void,

  accountId: number,
  setAccountId: (value: number) => void,
  market: string,
  setMarket: (value: string) => void,
  currency: string,
  setCurrency: (value: string) => void,
  startingBalance: number,
  setStartingBalance: (value: number) => void,
}

export const useUserSettings = create<UserSettingsProps>((set) => ({
  locale: 'en-US',
  setLocale: (value: string) => set({ locale: value }),
  is24Hour: true,
  setIs24Hour: (value: boolean) => set({ is24Hour: value }),

  accountId: 0,
  setAccountId: (value: number) => set({ accountId: value }),
  market: '',
  setMarket: (value: string) => set({ market: value }),
  currency: 'USD',
  setCurrency: (value: string) => set({ currency: value }),
  startingBalance: 0,
  setStartingBalance: (value: number) => set({ startingBalance: value }),
}))
