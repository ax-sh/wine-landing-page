import axios from 'axios'

import { useQuery } from '@tanstack/react-query'

import { Post } from '../mocks'
import Loader from './Loader.tsx'

const getPosts = async () => axios.get('https://jsonplaceholder.typicode.com/posts').then(res => res.data)

function usePostQuery() {
	return useQuery<Post[]>({
		queryKey: ['posts'],
		queryFn: getPosts
	})
}

export default function HttpApp() {
	// const { isLoading, isSuccess, isError, data } = usePostQuery()
	// if (isLoading) return <Loader />
	// if (isError) return <>error</>
	// console.log(isSuccess, data)
	return <div>Hello</div>
}
