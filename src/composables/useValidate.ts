import type { GenericSchema } from 'valibot'

import { safeParse } from 'valibot'
import { computed, ref } from 'vue'

type Errors<T> = Partial<Record<keyof T, string>>

export const useValidate = <T>(schema: GenericSchema<T>) => {
	const errors = ref<Errors<T>>({})
	const wasValidated = ref(false)
	const isValid = computed(() => wasValidated.value && Object.keys(errors.value).length === 0)
	const validate = (data: T) => {
		wasValidated.value = true
		const result = safeParse(schema, data)

		errors.value = {}

		const newErrors: Errors<T> = {}

		if (!result.success) {
			result.issues.forEach((issue) => {
				const key = issue.path?.[0].key as keyof T

				if (key) {
					newErrors[key] = issue.message
				}
			})
		}

		errors.value = newErrors
	}

	return { errors, isValid, validate }
}
