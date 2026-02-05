import type { Account } from '@/types'

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAccountsStore = defineStore('accounts', () => {
	const accounts = ref<Account[]>([])

	const addAccount = () => {
		accounts.value.push({
			id: crypto.randomUUID(),
			tagString: '',
			tags: [],
			type: 'local',
			login: '',
			password: '',
			touched: false,
		})
	}

	const removeAccount = (id: Account['id']) => {
		accounts.value = accounts.value.filter((a) => a.id !== id)
	}

	return {
		accounts,
		addAccount,
		removeAccount,
	}
})
