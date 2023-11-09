//--------------Création des trajets dans BOOK-CONTAINER sur l'ACCUEIL

let bookings = [];//C'est le panier des trajets
let total;//Montant total des trajets


document.querySelector('#btn-search').addEventListener('click', function () {
	fetch('http://localhost:3000/mycart',{
		method:'POST',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify({
			departure:document.querySelector('#cityNameInputD').value,
			arrival:document.querySelector('#cityNameInputA').value,
			date:moment(document.querySelector('#travelDay').value).format('YYYY-MM-DD')
		})
	})
		.then (response => response.json())
		.then(data => {
			console.log(data)
			if (data.result) {
				data.trip.forEach((trajet) => {
					//Récupération de l'heure dans la clé date de l'objet trajet
					const dateValue = trajet.date;
					const timeValue = moment(dateValue).format('HH:mm');
					console.log(timeValue)
					//Création de chaque trajet avec les éléments
					document.querySelector('#book-container').innerHTML += `
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
					<button type="button" class="book btn btn-success">BOOK</button>
						`;
					document.querySelector('.img-content-right').style.display = 'none';
					//on fait le total des prix des différents trajets avec la méthode reduce((acc,e)=>{},départ)
					total = bookings.reduce((cumul, trajet) => cumul + trajet.price, 0);
					console.log(total)
				})
			}else {
			
				console.log('Pas de trajet')
			}
		})
});
//------------------Selection des trajets via le bouton BOOK dans l'accueil---------

for (let i=0; i < document.querySelectorAll('.trip').length; i++) {
	document.querySelectorAll('.trip')[i].addEventListener('click', function(){
	  this.parentNode.remove();
	  //Bloc voyage avec bouton DELETE & SS BOOK
	  document.querySelector('#book-container-cart').innerHTML += `
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
	  				<button type="button" id="delete" class="btn btn-success">X</button>
					`

	});
	} 
   


//BOOKING injection VOYAGE avec DUREE avant départ & FOOTER
document.querySelector('#book-container-cart').innerHTML += `
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
//CART injection VOYAGE avec DELETE & CHECKOUT
document.querySelector('#book-container-cart').innerHTML += `
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
	  	<button type="button" id="delete" class="btn btn-success">X</button>
	</div>
	<div id="checkout-summary">
        <p id="total-title">Total:<span id="total-amount">103€</span></p>
        <button type="button" id="purchase" class="btn btn-success">Purchase</button>
    </div>
`
//CART injection du TITRE
document.querySelector('#result-content-cart').innerHTML += `
	<span class="title-result-content">My Cart</span>
`



	//--------------Supprimer un TRAJET de son CART
//Sur chaque trajet, j'ajoute une écoute.Au clic, cela l'enlève et met à jour le total des bookings
for (let i = 0; i < document.querySelectorAll('.deleteTrip').length; i++) {
	document.querySelectorAll('.deleteTrip')[i].addEventListener('click', function () {
	this.parentNode.remove();
	bookings = document.querySelectorAll('.trip');
	
});
}
//--------------Calcul du temps restant avant le départ
/*
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
*/