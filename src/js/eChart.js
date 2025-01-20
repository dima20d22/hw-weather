import * as echarts from 'echarts'
import { getWeather } from './API'

export function updateTemperatureChart(city) {
	const chartDom = document.getElementById(`temperature-chart-${city}`)
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
			console.error('Ошибка при загрузке данных для графика:', error)
		})
}
