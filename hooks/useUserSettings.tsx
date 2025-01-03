import { create } from 'zustand'

type UserSettingsProps = {
  is24Hour: boolean,
  setIs24Hour: (value: boolean) => void,
  accountId: number,
  setAccountId: (value: number) => void,
  market: string,
  setMarket: (value: string) => void,
  startingBalance: number,
  setStartingBalance: (value: number) => void,
}

export const useUserSettings = create<UserSettingsProps>((set) => ({
  is24Hour: true,
  setIs24Hour: (value: boolean) => set({ is24Hour: value }),
  accountId: 0,
  setAccountId: (value: number) => set({ accountId: value }),
  market: '',
  setMarket: (value: string) => set({ market: value }),
  startingBalance: 0,
  setStartingBalance: (value: number) => set({ startingBalance: value }),
}))
