import { create } from 'zustand'

type PayBillState = {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const usePayBill = create<PayBillState>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}))
