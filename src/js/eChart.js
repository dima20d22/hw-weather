import * as echarts from 'echarts'
import { getWeather } from './API'

export function updateTemperatureChart(city) {
	const chartContainer = document.getElementById(
		`temperature-chart-${locationName}-${tab}`
	)
	if (!chartDom) return

	chartDom.style.width = '900px'
	chartDom.style.height = '400px'

	const myChart = echarts.init(chartDom)

	getWeather(city)
		.then(response => {
			const hourlyData = response.data.forecast.forecastday[0].hour
			const timeData = hourlyData.map(hour => hour.time.split(' ')[1])
			const temperatureData = hourlyData.map(hour => hour.temp_c) //

			const option = {
				title: { text: `Temperature for ${locationName}` },
				tooltip: {},
				xAxis: {
					type: 'category',
					data: [
						'12 AM',
						'3 AM',
						'6 AM',
						'9 AM',
						'12 PM',
						'3 PM',
						'6 PM',
						'9 PM',
					],
				},
				yAxis: { type: 'value' },
				series: [
					{
						data: [10, 12, 13, 14, 15, 16, 17, 18],
						type: 'line',
					},
				],
			}

			chart.setOption(options)
		})
		.catch(error => {
			console.error('Ошибка при загрузке данных для графика:', error)
		})
}
