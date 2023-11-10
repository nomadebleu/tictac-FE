//BOOKING injection VOYAGE avec DUREE avant départ & FOOTER
document.querySelector('#book-container-booking').innerHTML += `
	<div class ="trip">
		<div>
  			<p id="departure">${trajet.departure}</p>
		</div>
		<div>
  			<p>></p>
		</div>
		<div>
  			<p id="arrival">${trajet.arrival}</p>
		</div>
		<div>
  			<p id="time">${timeValue}</p>
		</div>
		<div>
			<p id="price">${trajet.price}€</p>
		</div>
		<div>
			<p id="duree">Departure in 5 hours</p>
		</div>
		<div id="bloc-footer">
			<hr class="line" style="width: 40%" />
    		<p class="pub">Enjoy your travels with Tickethack</p>
		</div>
	</div>
`
//BOOKING injection du TITRE
document.querySelector('#result-content-booking').innerHTML += `
	<span class="title-result-content">My Bookings</span>
`

//--------------Calcul du temps restant avant le départ

//Il faut récupérer ou connecter timeD avec les données
const timeD = "2023-11-08T06:27:46.071Z"
//Conversion pour récuperer l'heure
const timeDepart = moment(timeD).format('HH:mm')

//Génération de la date actuelle avec conversion pour avoir l'heure
const dateNew = new Date();
const dateActuelle = moment(dateNew).format('HH:mm')

//Calcul de la durée avec moment & conversion des min.en H+m
const duree = moment(dateNew).diff(moment(timeD), 'minutes');
const dureeHeures = Math.floor(duree / 60);
const dureeMinutes = duree % 60;
//Il faut injecter le résultat dans le FE
console.log(`Departure in ${dureeHeures}h ${dureeMinutes}min.`);
