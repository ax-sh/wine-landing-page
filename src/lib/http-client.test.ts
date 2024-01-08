import { AxiosError, isAxiosError } from 'axios'
import { expect } from 'vitest'

import { httpClient } from './http-client.ts'

import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(http.get('/test', () => HttpResponse.json({ message: 'success' })))

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe(httpClient.name, () => {
	it('should pass', () => {
		expect(httpClient).toBeDefined()
	})

	it('should pass get', () => {
		expect(httpClient.get).toBeDefined()
	})
	it('should pass post', () => {
		expect(httpClient.post).toBeDefined()
	})

	it('should get api response', async () => {
		const response = await httpClient.get('/test')
		const data = await response.data
		expect(data).toEqual({ message: 'success' })
	})

	it('should fail api response', async () => {
		server.use(http.get('/test', () => HttpResponse.json({ message: 'fail' }, { status: 500 })))
		try {
			await httpClient.get('/test')
		} catch (e) {
			if (!isAxiosError(e)) return
			const err: AxiosError = e
			const response = err.response
			const data = response?.data

			expect(data).toEqual({ message: 'fail' })
		}
	})
})
