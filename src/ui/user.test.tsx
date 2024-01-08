import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'

import { ReactQueryTestWrapper } from '../configs/query-wrapper.tsx'
import { API_ROUTES } from '../constants'
import Loader from './Loader.tsx'
import User from './user.tsx'

import { HttpResponse, delay, http } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer()

describe('Loading Indicator', () => {
	test('it has the correct aria attributes', () => {
		render(<Loader />)
		const loadingElement = screen.getByLabelText(/loader/i)
		expect(loadingElement).toHaveAttribute('aria-live', 'polite')
		expect(loadingElement).toHaveAttribute('aria-busy', 'true')
	})
})

describe(User.name, () => {
	beforeAll(() => server.listen())
	afterEach(() => server.resetHandlers())
	afterAll(() => server.close())
	it('should load component', () => {
		server.use(http.get(API_ROUTES.USER, () => HttpResponse.json()))
		render(<User />, { wrapper: ReactQueryTestWrapper })
	})

	it('should load successful data', async () => {
		server.use(http.get(API_ROUTES.USER, async () => HttpResponse.json({ user: 'Jon Doe' })))

		render(<User />, { wrapper: ReactQueryTestWrapper })

		expect(await screen.findByText(/Jon Doe/)).toBeInTheDocument()
	})

	it('should load loading state', async () => {
		server.use(http.get(API_ROUTES.USER, async () => await delay('infinite')))

		render(<User />, { wrapper: ReactQueryTestWrapper })
		expect(screen.getByTestId('loader')).toBeInTheDocument()
	})

	it('should load success state', async () => {
		server.use(
			http.get(API_ROUTES.USER, async () => {
				await delay()
				return HttpResponse.json({ user: 'Jon Doe' })
			})
		)

		render(<User />, { wrapper: ReactQueryTestWrapper })
		await waitForElementToBeRemoved(await screen.findByTestId('loader'))
		expect(await screen.findByText(/Jon Doe/)).toBeInTheDocument()
	})

	it('should load error state', async () => {
		server.use(
			http.get(API_ROUTES.USER, async () => {
				await delay()
				return HttpResponse.json({ user: 'Jon Doe' }, { status: 500 })
			})
		)

		render(<User />, { wrapper: ReactQueryTestWrapper })
		await waitForElementToBeRemoved(await screen.findByTestId('loader'))
		expect(screen.getByRole('alert')).toBeInTheDocument()
	})

	// it('should load component data', async () => {
	// 	server.use(
	// 		http.get('/user', async () => {
	// 			await delay()
	// 			return HttpResponse.json(
	// 				{ user: 'Jon Doe' }
	// 				// { status: 500 }
	// 			)
	// 		})
	// 	)
	//
	// 	render(<User />, { wrapper: ReactQueryTestWrapper })
	// 	// userEvent.click(screen.getByTestId('show-child'))
	// 	// await waitFor(() => screen.findByTestId('loader'), { timeout: 1000 })
	// 	// const loader = screen.getByTestId('loader')
	// 	// const loader = await screen.findByTestId('loader')
	//
	// 	// const loader = screen.findByTestId('loader')
	//
	// 	// await waitFor(async () => {
	// 	// 	const loader = await screen.findByTestId('loader')
	// 	// 	// const loader = await screen.findByRole('heading')
	// 	// 	return expect(loader).not.toBeInTheDocument()
	// 	// 	// return loader
	// 	// })
	// 	expect(await screen.findByText(/Jon Doe/)).toBeInTheDocument()
	// 	screen.debug()
	//
	// 	// expect(screen.getByRole('heading')).toHaveTextContent('Jon Doe')
	// })
})
