import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
	slug: 'users',
	admin: {
		useAsTitle: 'email',
		group: 'Admin'
	},
	auth: true,
	fields: [
		{
			name: 'first_name',
			label: 'First Name',
			type: 'text'
		},
		{
			name: 'last_name',
			label: 'Last Name',
			type: 'text'
		},
		{
			name: 'role',
			label: 'Role',
			type: 'select',
			saveToJWT: true,
			defaultValue: 'admin',
			options: [
				{
					label: 'Admin',
					value: 'admin'
				},
				{
					label: 'Editor',
					value: 'editor'
				}
			]
		}
	]
}
