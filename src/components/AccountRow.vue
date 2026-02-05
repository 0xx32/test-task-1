<script setup lang="ts">
import type { Account } from '@/types'

import { Trash2 } from 'lucide-vue-next'
import { computed, reactive } from 'vue'

import { Button, Input, PasswordInput, Textarea } from '@/components/ui'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useValidate } from '@/composables/useValidate'
import { accountSchema } from '@/utils/schemas/account'

const { id, initialAccount } = defineProps<{ id: Account['id']; initialAccount: Account }>()

const emits = defineEmits<{
	(e: 'remove', id: string): void
	(e: 'update', account: Account): void
}>()

const account = reactive({
	id: initialAccount.id,
	type: initialAccount.type,
	login: initialAccount.login,
	password: initialAccount.password ?? '',
	tagString: initialAccount.tags.map((tag) => tag.text).join(';'),
})

const isLocal = computed(() => account.type === 'local')

const { errors, validate } = useValidate(accountSchema)

const splitTags = (value: string) => {
	if (!value.trim()) return []
	return value
		.split(';')
		.map((tag) => tag.trim())
		.filter(Boolean)
		.map((text) => ({ text }))
}

const onBlur = () => {
	let isValid = false

	if (account.type === 'local') {
		isValid = validate({
			login: account.login,
			password: account.password,
			tagString: account.tagString,
			type: 'local',
		})
	} else if (account.type === 'ldap') {
		isValid = validate({
			login: account.login,
			password: null,
			tagString: account.tagString,
			type: 'ldap',
		})
	}

	if (isValid) {
		const tags = splitTags(account.tagString)

		if (account.type === 'local') {
			emits('update', {
				id: account.id,
				login: account.login,
				type: 'local',
				password: account.password,
				tags,
			})
		}

		if (account.type === 'ldap') {
			emits('update', {
				id: account.id,
				login: account.login,
				type: 'ldap',
				password: null,
				tags,
			})
		}
	}
}
const removeAccountHandler = () => {
	emits('remove', id)
}
</script>
<template>
	<div class="grid grid-cols-[1fr_1fr_1fr_1fr_40px] gap-5">
		<Textarea
			v-model="account.tagString"
			name="tagString"
			placeholder="Значение"
			:class="{
				'border border-red-500': !!errors.tagString,
			}"
			class="h-9 min-h-9 resize-none overflow-hidden py-2 focus:overflow-y-auto"
			@blur="onBlur()"
		/>

		<Select v-model="account.type" @update:open="(value) => !value && onBlur()">
			<SelectTrigger class="w-full">
				<SelectValue placeholder="Значение" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="local"> Локальная </SelectItem>
				<SelectItem value="ldap"> LDAP </SelectItem>
			</SelectContent>
		</Select>
		<Input
			v-model="account.login"
			name="login"
			placeholder="Значение"
			:class="{
				'border border-red-500': !!errors.login,
				'col-span-2': !isLocal,
			}"
			@blur="onBlur()"
		/>
		<PasswordInput
			v-if="isLocal"
			v-model="account.password"
			name="password"
			placeholder="Значение"
			wrapper-class="h-fit"
			:class="{
				'border border-red-500': !!errors.password,
			}"
			@blur="onBlur()"
		/>

		<Button variant="ghost" @click="removeAccountHandler">
			<Trash2 />
		</Button>
	</div>
</template>
