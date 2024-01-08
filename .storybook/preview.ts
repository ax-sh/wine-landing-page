// replace with the name of your tailwind css file
import { withThemeByClassName } from '@storybook/addon-themes'
import { initialize, mswLoader } from 'msw-storybook-addon'

import type { Preview } from '@storybook/react'

import '../src/global.css'

// Initialize MSW
initialize()

export const decorators = [
	withThemeByClassName({
		themes: {
			light: 'light',
			dark: 'dark'
		},
		defaultTheme: 'light'
	})
]

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	},
	// Provide the MSW addon loader globally
	loaders: [mswLoader]
}

export default preview
