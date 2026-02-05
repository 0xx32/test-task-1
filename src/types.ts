export interface BaseAccount {
	id: string
	login: string
	password: string
	tags: { text: string }[]
	tagString: string
	touched: boolean
	type: 'ldap' | 'local'
}

export type Account =
	| ({ type: 'ldap'; password: null } & BaseAccount)
	| ({ type: 'local'; password: string } & BaseAccount)
