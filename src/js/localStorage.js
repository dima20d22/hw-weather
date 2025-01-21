import { renderCards } from './render'

const box = document.querySelector('.box')

const saveDataToLocalStorage = data => {
	localStorage.setItem('weatherData', JSON.stringify(data))
}

export const loadDataFromLocalStorage = () => {
	const data = localStorage.getItem('weatherData')
	return Array.isArray(JSON.parse(data)) ? JSON.parse(data) : []
}

export const addWeatherCards = weatherData => {
	const localStorageData = loadDataFromLocalStorage()
	localStorageData.push(weatherData)
	saveDataToLocalStorage(localStorageData)
	renderCards(localStorageData)
}

export const deleteCards = index => {
	const localStorageData = loadDataFromLocalStorage()
	localStorageData.splice(index, 1)
	saveDataToLocalStorage(localStorageData)
	renderCards(localStorageData)
}

export const savedWeatherData = loadDataFromLocalStorage
