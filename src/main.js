import 'izitoast/dist/css/iziToast.min.css'
import { tryAndCatch } from './js/tryAndCatch.js'
import iziToast from 'izitoast'
// import { box } from './js/render.js'

const form = document.querySelector('.header__form')
const input = document.querySelector('.header__form__input')
const buttonMoreDetails = document.querySelector('.cards__button')
const cardsAdditionally = document.querySelector(
	'.cards__additionally[type=button]'
)
let headerCity = document.querySelector('.header__city')

form.addEventListener('submit', async e => {
	e.preventDefault()
	let inputValue = input.value.trim()
	headerCity.innerHTML = inputValue
	if (inputValue === '') {
		iziToast.error({
			title: 'Error',
			message: 'Please enter a city name',
			position: 'topRight',
		})
		return
	}

	await tryAndCatch(inputValue)
	input.value = ''
})

document.addEventListener('click', e => {
	if (e.target.classList.contains('cards__button')) {
		e.preventDefault()
		const parentCard = e.target.closest('.cards__div')
		const details = parentCard.querySelector('.cards__additionally')
		details.classList.toggle('is-hidden')
		if (document.querySelector('.cards__button').innerHTML === 'More details') {
			document.querySelector('.cards__button').innerHTML = 'Hide details'
		} else {
			document.querySelector('.cards__button').innerHTML = 'More details'
		}
	}
})
