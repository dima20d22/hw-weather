export const box = document.querySelectorAll('.content-tab')

export function renderIcon() {
	const icons = document.querySelectorAll('.cards__title__icon')
	icons.forEach(icon => {
		icon.innerHTML = `<use href="./src/sprite.svg/logos.svg#trash-basket--svg"></use>`
	})
}

export function renderCards(data) {
	box.innerHTML = ''

	data.forEach((weatherData, index) => {
		const card = document.createElement('div')
		card.classList.add('cards__div')
		if (index === 1) {
			// Завтрашняя карточка
			card.classList.add('tomorrow')
		}
		card.innerHTML = `
      <div class="cards__title">
        <h2 class="cards__current--weather">Weather 
          <span class="city-name">${weatherData.location.name}</span>
        </h2>
        <button class="cards__title__button--delete" data-index="${index}">
          <svg class="cards__title__icon"></svg> Delete
        </button>
      </div>
      <div class="content-wrapper">
        <div class="content-wrapper__left">
          <img class="cards__condition-icon" src="${weatherData.day.condition.icon}" alt="Weather icon">
          <div class="content-wrapper__left__text">
            <div class="temperature">${weatherData.day.avgtemp_c}&deg;</div>
            <div class="cards__condition-text">${weatherData.day.condition.text}</div>
          </div>
        </div>
        <div class="content-wrapper__right">
          <div>
            <div class="cards__wind">Wind speed
              <span class="cards__wind__right">${weatherData.day.maxwind_kph} km/h</span>
            </div>
            <div class="temperature-feels">Feels like
              <span class="temperature-feels__right">${weatherData.day.avgtemp_c}°</span>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="cards__button">More details</button>
      <div class="cards__additionally is-hidden">
        <div class="cards__precip">Precipitation 
          <span class="cards__precip__right"> ${weatherData.day.totalprecip_mm} mm </span>
        </div>
        <div class="cards__cloud">Cloudiness 
          <span class="cards__cloud__right"> ${weatherData.day.avghumidity} %</span>
        </div>
      </div>
    `

		box.appendChild(card)
	})
	renderIcon()

	document.addEventListener('click', e => {
		if (e.target.classList.contains('delete-card')) {
			const index = e.target.getAttribute('data-index')
			deleteCards(index) // Удаляем карточку по индексу
		}
	})
}
