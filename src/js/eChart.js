import * as echarts from 'echarts'
import { getWeather } from './API'

export function updateTemperatureChart(city) {
	if (!city || typeof city !== 'string' || city === '') {
		console.error(
			'The city is not specified or is specified incorrectly:',
			city
		)
		return
	}

	const chartDom = document.getElementById(`temperature-chart-${city}`)

	if (!chartDom) {
		console.error('Element with id "temperature-chart" was not found.')
		return
	}

	chartDom.style.width = '100%'
	chartDom.style.height = '400px'

	setTimeout(() => {
		let myChart = echarts.getInstanceByDom(chartDom)
		if (!myChart) {
			myChart = echarts.init(chartDom)
		}

		getWeather(city)
			.then(response => {
				if (
					!response.data ||
					!response.data.forecast ||
					!response.data.forecast.forecastday ||
					!Array.isArray(response.data.forecast.forecastday)
				) {
					console.error('Incorrect data from API. Answer:', response.data)
					return
				}

				const hourlyData = response.data.forecast.forecastday[0].hour

				if (!hourlyData || hourlyData.length === 0) {
					console.error('There is no data to plot.')
					return
				}

				const timeData = hourlyData.map(hour => hour.time.split(' ')[1])
				const temperatureData = hourlyData.map(hour => hour.temp_c)

				const option = {
					title: {
						text: `Temperature in ${city}`,
						left: 'center',
					},
					xAxis: {
						type: 'category',
						data: timeData,
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
							data: temperatureData,
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
				console.error('Error loading data for chart:', error)
			})
	}, 500)
}
