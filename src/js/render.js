export const box = document.querySelector('.box')

function renderIcon() {
	const icons = document.querySelectorAll('.cards__title__icon')
	icons.forEach(icon => {
		icon.innerHTML = `<use href="./src/sprite.svg/logos.svg#trash-basket--svg"></use>`
	})
}

export function renderCards(data) {
	box.innerHTML = ''
	data.forEach((elem, index) => {
		box.innerHTML += `
		<div class="cards__div">
			<div class="cards__title">
				<h2 class="cards__current--weather">Weather </h2>
				<button class="cards__title__button--delete" data-index="${index}">
					<svg class="cards__title__icon"></svg>
				</button>
			</div>
			<div class="content-wrapper">
				<div class="content-wrapper__left">
					<img class="cards__condition-icon" src="https:${elem.condition.icon}" alt="Weather icon">
					<div class="content-wrapper__left__text">
						<div class="temperature">${elem.temp_c}&deg;</div>
						<div class="cards__condition-text">${elem.condition.text}</div>
					</div>
				</div>
				<div class="content-wrapper__right">
					<div>
						<div class="cards__wind">Windgeschwindigkeit
							<span class="cards__wind__right">${elem.wind_kph} km/h</span>
						</div>
						<div class="temperature-feels">fühlt sich an wie 
							<span class="temperature-feels__right">${elem.feelslike_c}&deg;</span>
						</div>
					</div>
				</div>
			</div>
			<button type="button" class="cards__button">More details</button>
			<div class="cards__additionally is-hidden">
				<div class="cards__precip">Niederschlag in Millimetern 
				<span class="cards__precip__right"> ${elem.precip_mm} mm </span> </div>

				<div class="cards__cloud">wolkig 
				<span class="cards__cloud__right"> ${elem.cloud} %</span> </div>

				<div class="cards__humidity">Luftfeuchtigkeitsprozentsatz 
				<span class="cards__humidity__right"> ${elem.humidity} %</span> </div>
			</div>
		</div>
		`
	})
	renderIcon()

	document.querySelectorAll('.cards__title__button--delete').forEach(button => {
		button.addEventListener('click', event => {
			const index = event.target.getAttribute('data-index')
			deleteCards(index)
		})
	})
}
