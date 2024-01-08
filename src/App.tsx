import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'

import Loader from './ui/Loader.tsx'

function App() {
	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<Suspense fallback={<Loader />}>{useRoutes(routes)}</Suspense>
		</ErrorBoundary>
	)
}

export default App
