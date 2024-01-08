import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		// environment: 'happy-dom', // TEMP disable for now because of type error
		setupFiles: './src/configs/setup-test.ts'
	}
})
