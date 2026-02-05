import * as v from 'valibot'

const baseSchema = {
	tagString: v.pipe(v.string(), v.maxLength(50, 'Максимум 50 символов')),
	login: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(1, 'Логин обязателен'),
		v.maxLength(100, 'Максимум 100 символов')
	),
}

export const accountSchema = v.variant('type', [
	v.object({
		...baseSchema,
		type: v.literal('local'),
		password: v.pipe(
			v.string(),
			v.trim(),
			v.minLength(1, 'Пароль обязателен'),
			v.maxLength(100, 'Максимум 100 символов')
		),
	}),
	v.object({
		...baseSchema,
		type: v.literal('ldap'),
		password: v.null(),
	}),
])
