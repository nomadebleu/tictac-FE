document.querySelector('#addBook').addEventListener('click', function () {
	const tripBook = document.querySelector('#tripBookInput').value;

	fetch('http://localhost:3000/cart', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ cityName }),
	}).then(response => response.json())
		.then(data => {
			if (data.result) {
				document.querySelector('#cityList').innerHTML += `
			<div class="bookContainer">
				<p class="departure">${data.weather.cityName}</p>
				<p class="arrival">${data.weather.description}</p>
				<img class="weatherIcon" src="images/${data.weather.main}.png"/>
				<div class="temperature">
					<p class="tempMin">${data.weather.tempMin}°C</p>
					<span>-</span>
					<p class="tempMax">${data.weather.tempMax}°C</p>
				</div>
				<button class="deleteCity" id="${data.weather.cityName}">Delete</button>
			</div>
					`;
				updateDeleteCityEventListener();
				document.querySelector('#cityNameInput').value = '';
			}

		});
});