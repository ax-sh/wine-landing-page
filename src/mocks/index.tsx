// Mock Data
export interface Post {
	userId: number
	id: number
	title: string
	body: string
}

export const posts: Post[] = [
	{
		userId: 1,
		id: 1,
		title: 'first post title',
		body: 'first post body'
	},
	{
		userId: 2,
		id: 5,
		title: 'second post title',
		body: 'second post body'
	},
	{
		userId: 3,
		id: 6,
		title: 'third post title',
		body: 'third post body'
	}
]
