import { renderCards } from './render'

const box = document.querySelector('.box')

const saveDataToLocalStorage = data => {
	localStorage.setItem('weatherData', JSON.stringify(data))
}

const loadDataFromLocalStorage = () => {
	const data = localStorage.getItem('weatherData')
	return Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [] //
}

export const addWeatherCards = weatherData => {
	const weatherCard = loadDataFromLocalStorage()
	weatherCard.push(weatherData)
	saveDataToLocalStorage(weatherCard)
	renderCards(weatherCard)
}

export const deleteCards = index => {
	const weatherCard = loadDataFromLocalStorage()
	weatherCard.splice(index, 1)
	saveDataToLocalStorage(weatherCard)
	renderCards(weatherCard)

	box.style.width = '50%'
}

export const savedWeatherData = loadDataFromLocalStorage()
