<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

import { Button } from '@/components/ui'

import AccountRow from './components/AccountRow.vue'
import { useAccountsStore } from './stores/accounts'

const accountsStore = useAccountsStore()

accountsStore.$subscribe((_, state) => {
	localStorage.setItem('accounts', JSON.stringify(state.accounts))
})
</script>

<template>
	<div class="mx-auto max-w-200 pt-30">
		<div class="mb-6 flex items-center gap-4">
			<h2 class="text-xl font-semibold">Учетные записи</h2>
			<Button variant="outline" @click="accountsStore.addAccount">
				<Plus />
			</Button>
		</div>

		<div class="bg-accent mb-6 rounded-xs px-2 py-1">
			<div class="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full border p-2">
				?
			</div>
			<p class="text-muted-foreground text-md inline">
				Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
			</p>
		</div>

		<div class="mb-2 grid grid-cols-[1fr_1fr_1fr_1fr_40px] gap-5">
			<span class="text-md text-muted-foreground">Метки</span>
			<span class="text-md text-muted-foreground">Тип записи</span>
			<span class="text-md text-muted-foreground">Логин</span>
			<span class="text-md text-muted-foreground">Пароль</span>
		</div>

		<div class="flex flex-col gap-4">
			<AccountRow
				v-for="account in accountsStore.accounts"
				:id="account.id"
				:key="account.id"
				:initial-account="account"
				@remove="(id) => accountsStore.removeAccount(id)"
				@update="(account) => accountsStore.updateAccount(account)"
			/>
		</div>
	</div>
</template>
