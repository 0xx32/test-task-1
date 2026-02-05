export interface BaseAccount {
	id: string
	login: string
	tags: { text: string }[]
}

export type Account =
	| ({ type: 'ldap'; password: null } & BaseAccount)
	| ({ type: 'local'; password: string } & BaseAccount)
