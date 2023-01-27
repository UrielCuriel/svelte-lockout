import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';
/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
			$src: resolve('./src'),
			$components: resolve('./src/components')
		}
	}
};

export default config;
