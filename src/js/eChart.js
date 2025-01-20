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
	const chartDomTomorrow = document.getElementById(
		`temperature-chart-${city}-tomorrow`
	)

	if (!chartDom && !chartDomTomorrow) {
		console.error('Element with id "temperature-chart" was not found.')
		return
	}

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
				if (
					!response.data ||
					!response.data.forecast ||
					!response.data.forecast.forecastday ||
					!Array.isArray(response.data.forecast.forecastday)
				) {
					console.error('Incorrect data from API. Answer:', response.data)
					return
				}

				const hourlyDataToday = response.data.forecast.forecastday[0].hour
				const hourlyDataTomorrow = response.data.forecast.forecastday[1].hour

				if (!hourlyDataToday || hourlyDataToday.length === 0) {
					console.error('There is no data to plot for today.')
					return
				}

				if (!hourlyDataTomorrow || hourlyDataTomorrow.length === 0) {
					console.error('There is no data to plot for tomorrow.')
					return
				}

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
