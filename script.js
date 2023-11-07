//--------------Création des trajets dans book-container

let bookings = [];//C'est le panier des trajet
let total;//Montant total des trajets

document.querySelector('#btn-search').addEventListener('click', function () {
	fetch('http://localhost:3000/index/mycart')
		.then (response => response.json())
		.then(data => {
			if (data.result) {
				Trip.forEach((trajet) => {
					//Récupération de l'heure dans la clé date de l'objet trajet
					const dateValue = trajet.date;
					const timeValue = moment(dateValue).format('HH:mm');
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
					<p id="price">${trajet.price}</p>
					</div>
					<button id="book">BOOK</button>
						`;
					bookings.push(trajet);
					//on fait le total des prix des différents trajets avec la méthode reduce((acc,e)=>{},départ)
					total = bookings.reduce((cumul, trajet) => cumul + trajet.price, 0);
				})
			}else {
				console.log('Pas de trajet')
			}
		})
});

//--------------Supprimer un TRAJET de son cart
//Sur chaque trajet, j'ajoute une écoute.Au clic, cela l'enlève et met à jour le total des bookings
for (let i = 0; i < document.querySelectorAll('.deleteTrip').length; i++) {
	document.querySelectorAll('.deleteTrip')[i].addEventListener('click', function () {
	this.parentNode.remove();
	bookings = document.querySelectorAll('.trip')
	total -=  
	});
}
	