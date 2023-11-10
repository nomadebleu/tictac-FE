fetch("http://localhost:3000/mybookings")
  .then((response) => response.json())
  .then((data) => {
    if (data.result) {
      console.log(data);
      data.allBookings.forEach((booking) => {
        //Conversion de 'time'
        const dateValue = booking.time;
        const timeValue = moment(dateValue).format("HH:mm");

        //Calcul durée le départ
        //Conversion pour récuperer l'heure
        const timeDepart = moment(dateValue).format("HH:mm");

        //Génération de la date actuelle avec conversion pour avoir l'heure
        const dateNew = new Date();
        const dateActuelle = moment(dateNew).format("HH:mm");

        //Calcul de la durée avec moment & conversion des min.en H+m
        const duree = moment(dateNew).diff(moment(dateValue), "minutes");
        const dureeHeures = Math.floor(duree / 60);
        const dureeMinutes = duree % 60;

        //Création des bookings
        document.querySelector("#anyvoyage-booking").style.display = "none";
        document.querySelector("#book-container-booking").innerHTML += `
	<span class="title-result-content">My Bookings</span>
	`;
        document.querySelector("#book-container-booking").innerHTML += `
				<div class ="trip">
					<div>
				  		<p id="departure">${booking.departure}</p>
					</div>
					<div>
				  		<p>></p>
					</div>
					<div>
				 		<p id="arrival">${booking.arrival}</p>
					</div>
					<div>
				  		<p id="time">${timeValue}</p>
					</div>
					<div>
						<p id="price">${booking.price}€</p>
					</div>
					<div>
						<p id="duree">Departure in ${dureeHeures}h ${dureeMinutes}min.</p>
					</div>
				</div>
			`;
      });
      document.querySelector("#book-container-booking").innerHTML += `
							
					<div id="bloc-footer">
						<hr class="line" style="width: 40%" />
						<p class="pub">Enjoy your travels with Tickethack</p>
					</div>
			`;
    }
  });
