import { create } from 'zustand'

type FiltersProps = {
  showDelete: boolean,
  setShowDelete: (value: boolean) => void,
  showModal: boolean,
  setShowModal: (value: boolean) => void,
}

export const useFilters = create<FiltersProps>((set) => ({
  showDelete: false,
  setShowDelete: (value: boolean) => set({ showDelete: value }),
  showModal: false,
  setShowModal: (value: boolean) => set({ showModal: value }),
}))

export default useFilters