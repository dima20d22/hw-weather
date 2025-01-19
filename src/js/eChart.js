import * as echarts from 'echarts'
import { getWeather } from './API'

export function updateTemperatureChart(city) {
	const chartDom = document.getElementById('temperature-chart')

	const input = document.querySelector('.header__form__input')
	const inputValue = input.value.trim()

	if (!chartDom) {
		console.error('Элемент с id "temperature-chart" не найден.')
		return
	}

	chartDom.style.width = '100%'
	chartDom.style.height = '400px'

	const myChart = echarts.init(chartDom)

	// Проверяем, передан ли город
	if (!inputValue || typeof inputValue !== 'string' || inputValue === '') {
		console.error('Город не указан или указан некорректно:', inputValue)
		return
	}

	getWeather(inputValue)
		.then(response => {
			// Проверяем, есть ли в ответе forecast.forecastday
			if (
				!response.data ||
				!response.data.forecast ||
				!response.data.forecast.forecastday ||
				!Array.isArray(response.data.forecast.forecastday)
			) {
				console.error('Некорректные данные от API. Ответ:', response.data)
				return
			}

			const hourlyData = response.data.forecast.forecastday[0].hour

			// Проверяем, есть ли данные для графика
			if (!hourlyData || hourlyData.length === 0) {
				console.error('Нет данных для построения графика.')
				return
			}

			const option = {
				title: {
					text: `Температура по часам в ${inputValue}`,
					left: 'center',
				},
				xAxis: {
					type: 'category',
					data: hourlyData.map(hour => hour.time.split(' ')[1]),
				},
				yAxis: {
					type: 'value',
					axisLabel: {
						formatter: '{value} °C',
					},
				},
				tooltip: {
					trigger: 'axis',
				},
				series: [
					{
						data: hourlyData.map(hour => hour.temp_c),
						type: 'line',
						smooth: true,
						itemStyle: {
							color: '#ff5733',
						},
					},
				],
			}

			myChart.setOption(option)
		})
		.catch(error => {
			console.error('Ошибка при загрузке данных для графика:', error)
		})
}
