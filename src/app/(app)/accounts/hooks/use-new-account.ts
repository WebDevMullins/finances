import { create } from 'zustand'

type SheetState = {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const useNewAccount = create<SheetState>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}))
