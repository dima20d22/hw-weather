import { getWeather } from './API'

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

		return response.data.current
	} catch (error) {
		console.error(error)
	}
}
