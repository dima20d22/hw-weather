const API = '24dc2da1c37145348bb122743251301'

import axios from 'axios'

export async function getWeather(input) {
	return await axios.get('https://api.weatherapi.com/v1/forecast.json', {
		params: {
			key: API,
			days: 1,

			q: input,
			lang: 'de',
		},
	})
}
