import { renderCards } from './render'

const box = document.querySelector('.box')

const saveDataToLocalStorage = data => {
	localStorage.setItem('weatherData', JSON.stringify(data))
}

export const loadDataFromLocalStorage = () => {
	const data = localStorage.getItem('weatherData')
	return Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [] //
}

export const addWeatherCards = data => {
	const localStorageData = loadDataFromLocalStorage()
	localStorageData.push(data)
	saveDataToLocalStorage(localStorageData)
}

export const deleteCards = index => {
	const localStorageData = loadDataFromLocalStorage()
	localStorageData.splice(index, 1)
	saveDataToLocalStorage(localStorageData)
	renderCards(localStorageData)

	box.style.width = '50%'
}

export const savedWeatherData = loadDataFromLocalStorage()
