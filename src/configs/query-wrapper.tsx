import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

export const ReactQueryTestWrapper = ({ children, client }: PropsWithChildren<{ client?: QueryClient }>) => {
	const queryClient =
		client ??
		new QueryClient({
			defaultOptions: {
				queries: {
					retry: false
				}
			}
		})
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
