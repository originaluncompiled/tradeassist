import { create } from 'zustand'

type UseDisplayDelete = {
  showDelete: boolean,
  setShowDelete: (value: boolean) => void,
  showModal: boolean,
  setShowModal: (value: boolean) => void,
}

export const useDisplayDelete = create<UseDisplayDelete>((set) => ({
  showDelete: false,
  setShowDelete: (value: boolean) => set({ showDelete: value }),
  showModal: false,
  setShowModal: (value: boolean) => set({ showModal: value }),
}))

export default useDisplayDelete