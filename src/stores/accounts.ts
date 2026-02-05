import type { Account } from '@/types'

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAccountsStore = defineStore('accounts', () => {
	//Можно изменить на useStore из @vueUse
	const accounts = ref<Account[]>(
		localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts') as string) : []
	)

	const addAccount = () => {
		accounts.value.push({
			id: crypto.randomUUID(),
			tags: [],
			type: 'local',
			login: '',
			password: '',
		})
	}

	const removeAccount = (id: Account['id']) => {
		accounts.value = accounts.value.filter((a) => a.id !== id)
	}

	const updateAccount = (account: Account) => {
		const index = accounts.value.findIndex((a) => a.id === account.id)
		accounts.value[index] = account
	}

	return {
		accounts,
		addAccount,
		removeAccount,
		updateAccount,
	}
})
