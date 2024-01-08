import { type Decorator } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const withAPIRequest: Decorator = Story => (
	<QueryClientProvider
		client={
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: false
					}
				}
			})
		}
	>
		<Story />
	</QueryClientProvider>
)

export default withAPIRequest
