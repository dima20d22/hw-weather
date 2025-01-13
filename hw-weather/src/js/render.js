export const box = document.querySelector('.box')

export function renderCards(data) {
	box.innerHTML = ''
	data.forEach(elem => {
		box.innerHTML += `
      <li class="cards">
	<div class="cards__div">
  <h2 class='cards__current--weather'>Current Weather</h2>
  
  <div class="temperature">Temperatur in Celsius: ${elem.temp_c}</div>
  <div class="temperature-feels">fühlt sich an wie: ${elem.feelslike_c}</div>
  <img class="cards__condition-icon" src="https:${elem.condition.icon}" alt="Weather icon">
  <div class="cards__condition-text">${elem.condition.text}</div>
<button class="cards__button">More details</button>
<div>
	<div class="cards__wind">Windgeschwindigkeit: ${elem.wind_kph}</div>
  <div class="cards__precip">Niederschlag in Millimetern: ${elem.precip_mm}</div>
  <div class="cards__cloud">wolkig: ${elem.cloud}</div>
  <div class="cards__humidity">Luftfeuchtigkeitsprozentsatz: ${elem.humidity}</div>
</div>
  
  </div>
</li>
      `
	})
}
