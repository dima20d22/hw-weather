import * as echarts from 'echarts'
import { getWeather } from './API'

export function updateTemperatureChart(city) {
	const chartDom = document.getElementById(`temperature-chart-${city}`)
	const chartDomTomorrow = document.getElementById(
		`temperature-chart-${city}-tomorrow`
	)

	chartDom.style.height = '400px'
	chartDomTomorrow.style.height = '400px'

	setTimeout(() => {
		let myChartToday = echarts.getInstanceByDom(chartDom)
		let myChartTomorrow = echarts.getInstanceByDom(chartDomTomorrow)

		if (!myChartToday) {
			myChartToday = echarts.init(chartDom)
		}

		if (!myChartTomorrow) {
			myChartTomorrow = echarts.init(chartDomTomorrow)
		}

		getWeather(city)
			.then(response => {
				const hourlyDataToday = response.data.forecast.forecastday[0].hour
				const hourlyDataTomorrow = response.data.forecast.forecastday[1].hour

				const timeDataToday = hourlyDataToday.map(
					hour => hour.time.split(' ')[1]
				)
				const timeDataTomorrow = hourlyDataTomorrow.map(
					hour => hour.time.split(' ')[1]
				)
				const temperatureDataToday = hourlyDataToday.map(hour => hour.temp_c)
				const temperatureDataTomorrow = hourlyDataTomorrow.map(
					hour => hour.temp_c
				)

				const optionToday = {
					title: {
						text: `Temperature in ${city}`,
						left: 'center',
					},
					xAxis: {
						type: 'category',
						data: timeDataToday,
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
							data: temperatureDataToday,
							type: 'line',
							smooth: true,
							itemStyle: {
								color: '#ff5733',
							},
						},
					],
				}

				const optionTomorrow = {
					title: {
						text: `Temperature in ${city} (Tomorrow)`,
						left: 'center',
					},
					xAxis: {
						type: 'category',
						data: timeDataTomorrow,
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
							data: temperatureDataTomorrow,
							type: 'line',
							smooth: true,
							itemStyle: {
								color: '#33b5ff',
							},
						},
					],
				}

				myChartToday.setOption(optionToday)
				myChartTomorrow.setOption(optionTomorrow)

				myChartToday.resize()
				myChartTomorrow.resize()
			})
			.catch(error => {
				console.error('Error loading data for chart:', error)
			})
	}, 500)
}
