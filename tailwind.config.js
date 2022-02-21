const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'cyan-400' : '#22D3EE',
				'cyan-500' : '#06B6D4',
				'green-25' : '#edf0e9',
				'green-c' : '#98d64a',
				'green-c-100' : '#3cb371',
				'green-c-200' : '#36A165',
				'primary-100' : '#FEC89A',
				'primary-200' : '#FEBE85',
				'primary-300' : '#FEB372',
				'secondary-100' : '#333333', 
				'secondary-200' : '#292929', 
			},
			spacing: {
				'4.5' : '18px',
				'18' : '76px',
				'85%' : '85%'
			},
			fontSize: {
				'xxs' : '10px'
			}
		},
		screens: {
			'xs': '375px',
			...defaultTheme.screens,
		  },

	},
	variants: {
	extend: {},
	},
	plugins: [],
}
