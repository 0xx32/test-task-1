<script setup lang="ts">
import type { Account } from '@/types'

import { Trash2 } from 'lucide-vue-next'
import { computed } from 'vue'

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

const { id, type } = defineProps<Account>()

const emits = defineEmits<{
	(e: 'remove', id: string): void
}>()

const accountModel = defineModel<Account>({
	required: true,
})
const isLDAP = computed(() => type !== 'local')

const { errors, validate } = useValidate(accountSchema)

const onBlur = () => {
	validate({
		login: accountModel.value.login,
		password: accountModel.value.password,
		tagString: accountModel.value.tagString,
		type: accountModel.value.type,
	})
}
const removeHandler = () => {
	emits('remove', id)
}
</script>
<template>
	<div class="grid grid-cols-[1fr_1fr_1fr_1fr_40px] gap-5">
		<Textarea
			v-model="accountModel.tagString"
			name="tagString"
			placeholder="Значение"
			:class="{
				'border border-red-500': !!errors.tagString,
			}"
			class="h-9 min-h-9 resize-none overflow-hidden py-2 focus:overflow-y-auto"
			@blur="onBlur()"
		/>

		<Select v-model="accountModel.type" @update:open="(value) => !value && onBlur()">
			<SelectTrigger class="w-full">
				<SelectValue placeholder="Значение" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="local"> Локальная </SelectItem>
				<SelectItem value="ldap"> LDAP </SelectItem>
			</SelectContent>
		</Select>
		<Input
			v-model="accountModel.login"
			name="login"
			placeholder="Значение"
			:class="{
				'border border-red-500': !!errors.login,
				'col-span-2': isLDAP,
			}"
			@blur="onBlur()"
		/>
		<PasswordInput
			v-if="!isLDAP"
			v-model="accountModel.password"
			name="password"
			placeholder="Значение"
			wrapper-class="h-fit"
			:class="{
				'border border-red-500': !!errors.password,
			}"
			@blur="onBlur()"
		/>

		<Button variant="ghost" @click="removeHandler">
			<Trash2 />
		</Button>
	</div>
</template>
