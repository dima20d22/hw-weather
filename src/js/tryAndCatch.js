import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

import { getWeather } from './API'

const input = document.querySelector('.header__form__input')

export async function tryAndCatch(inputValue) {
	try {
		const response = await getWeather(inputValue)

		if (response.status === 200) {
			return response.data
		}

		return response.data
	} catch (error) {
		if (error.response) {
			if (error.response.status === 400) {
				iziToast.error({
					title: 'Error',
					message: 'City not found',
					position: 'topRight',
				})
				input.value = ''
				return null
			}

			iziToast.error({
				title: 'Error',
				message: `Error: ${error.response.status}`,
				position: 'topRight',
			})

			return null
		} else if (error.request) {
			iziToast.error({
				title: 'Error',
				message: 'Network error. Please try again later.',
				position: 'topRight',
			})

			return null
		} else {
			console.error('Error', error.message)

			return null
		}
	}
}
