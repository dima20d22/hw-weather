import { getWeather } from './API'
import { renderCards } from './render'

export async function tryAndCatch(inputValue) {
	try {
		const response = await getWeather(inputValue)

		if (response.status !== 200) {
			iziToast.error({
				title: 'Error',
				message: 'City not found',
				position: 'topRight',
			})
			return
		}
		renderCards([response.data.current])
	} catch (error) {
		console.error(error)
	}
}
