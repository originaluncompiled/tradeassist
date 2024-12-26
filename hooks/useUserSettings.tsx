import { create } from 'zustand'

type UserSettingsProps = {
  is24Hour: boolean,
  setIs24Hour: (value: boolean) => void,
}

export const useUserSettings = create<UserSettingsProps>((set) => ({
  is24Hour: true,
  setIs24Hour: (value: boolean) => set({ is24Hour: value }),
}))

// TO-DO: Add profile & settings page's stuff to here