export const box = document.querySelector('.box')
export function renderCards(data) {
	box.innerHTML = ''
	data.forEach(elem => {
		box.innerHTML += `
      
	<div class="cards__div">
  <h2 class='cards__current--weather'>Weather</h2>
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
  <span class="cards__wind__right">${elem.wind_kph} km/h</span> </div>

  <div class="temperature-feels">fühlt sich an wie 
  <span class="temperature-feels__right">${elem.feelslike_c}&deg</span></div>

  </div>
  </div>
  
  </div>
  <button type="button" class="cards__button">More details</button>
<div class="cards__additionally is-hidden">
	
  <div class="cards__precip">Niederschlag in Millimetern: ${elem.precip_mm} mm</div>

  <div class="cards__cloud">wolkig: ${elem.cloud} %</div>

  <div class="cards__humidity">Luftfeuchtigkeitsprozentsatz: ${elem.humidity} %</div>
</div>
  
  </div>

      `
	})
}
