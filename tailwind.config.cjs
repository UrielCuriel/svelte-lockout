const { paletteThree } = require('@headwind-ui/color-palettes');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: paletteThree,
			fontSize: {
				'7xl': '5rem',
				'8xl': '6rem',
				'9xl': '7rem',
				'10xl': '8rem',
				'11xl': '9rem',
				'12xl': '10rem'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
