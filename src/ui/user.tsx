import { useQuery } from '@tanstack/react-query'

import { httpClient } from '../lib/http-client.ts'
import Loader from './Loader.tsx'

const getUser = () => httpClient.get('/user').then(response => response.data)
export default function User() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['user'],
		queryFn: getUser
	})
	// console.log(rest, isLoading, '<<<<<')
	if (isLoading) return <Loader />
	if (isError) return <strong role='alert'>Error</strong>
	return <h1>{data.user}</h1>
}
