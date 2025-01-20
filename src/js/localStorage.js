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

	renderCards(localStorageData)
	console.log('Weather data added to localStorage:', data)
}
export const deleteCards = index => {
	const localStorageData = loadDataFromLocalStorage()
	localStorageData.splice(index, 1) // Удаляем карточку по индексу
	saveDataToLocalStorage(localStorageData) // Сохраняем обновленные данные в localStorage
	renderCards(localStorageData) // Перерисовываем все карточки

	box.style.width = '50%' // Делаем ширину контейнера 50% после удаления
}

export const savedWeatherData = loadDataFromLocalStorage()
