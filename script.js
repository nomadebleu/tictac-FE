//Recherche des trajets ------------------------------------------------------------->
let bookings = [];//C'est le panier des trajets
let total;//Montant total des trajets
let searchData;//On sort les data pour les réutiliser ensuite

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
            searchData = data;
            if (data.result) {
                // Rajout de l'index pour identifier chaque trajet
                data.trip.forEach((trajet,index) => {
                    const dateValue = trajet.date;
                    const timeValue = moment(dateValue).format('HH:mm');

                    // ACCUEIL injection TRAJET avec BOOK
                    document.querySelector('#book-container').innerHTML += `
                        <div class="trip" id="trip-${index}">
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
                        </div>
                    `;
                    console.log('Contenu de #book-container après la modification :', document.querySelector('#book-container').innerHTML);
                    // RETRAIT des IMAGES & MESS avec DISPLAY NONE
                    document.querySelector('.img-content-right').style.display = 'none';
                    //Push le trajet pour calculer ensuite le prix total
                    bookings.push(trajet)
                    // TOTAL l'ensemble des TRAJETS trouvés avec .reduce((acc,e)=>{},départ)
                    total = bookings.reduce((cumul, trajet) => cumul + trajet.price, 0);
                });

                // Fonction pour ajouter des écouteurs à chaque trajet une fois qu'ils sont créés
                addEventListenersToBookButtons();
            } else {
                console.log('Pas de trajet')
            }
        })
});

// Fonction pour ajouter les écouteurs au bouton BOOK de chaque trajet
function addEventListenersToBookButtons() {
    const bookButtons = document.querySelectorAll('.btn-success');

    bookButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const selectedTrajet = searchData.trip[index];
            console.log(selectedTrajet);

            // Conversion de la date
            const dateObject = new Date(selectedTrajet.date);

            // Utilisation de toISOString pour formater la date pour l'intégrer à l'URL
            const timeValue = dateObject.toISOString();
            console.log(timeValue);

            button.parentNode.remove();
            window.location.href = `cart.html?departure=${selectedTrajet.departure}&arrival=${selectedTrajet.arrival}&time=${timeValue}&price=${selectedTrajet.price}`;
        });
    });
}

// Récupération des données dans cart.html

const urlParams = new URLSearchParams(window.location.search);
const departure = urlParams.get('departure');
const arrival = urlParams.get('arrival');
const time = urlParams.get('time');
const price = urlParams.get('price');

// CART Affiche le trajet avec DELETE
document.querySelector('#book-container-cart').innerHTML += `
    <div class="trip">
        <div>
            <p id="departure">k</p>
        </div>
        <div>
            <p>></p>
        </div>
        <div>
            <p id="arrival">k</p>
        </div>
        <div>
            <p id="time">k</p>
        </div>
        <div>
            <p id="price">k€</p>
        </div>
        <button type="button" id="delete" class="btn btn-success">X</button>
    </div>
`;
    


    //CART:INJECTION du TITRE & CHECKOUT
    document.querySelector('#result-content-cart').innerHTML += `
        <span class="title-result-content">My Cart</span>
        
        <div id="checkout-summary">
            <p id="total-title">Total:<span id="total-amount">103€</span></p>
            <button type="button" id="purchase" class="btn btn-success">Purchase</button>
        </div>
    `;

	    
		
		

		
	
   


//BOOKING injection VOYAGE avec DUREE avant départ & FOOTER
// document.querySelector('#book-container-cart').innerHTML += `
// 	<div class ="trip">
// 		<div>
//   			<p id="departure">${trajet.departure}</p>
// 		</div>
// 		<div>
//   			<p>></p>
// 		</div>
// 		<div>
//   			<p id="arrival">${trajet.arrival}</p>
// 		</div>
// 		<div>
//   			<p id="time">${timeValue}</p>
// 		</div>
// 		<div>
// 			<p id="price">${trajet.price}€</p>
// 		</div>
// 		<div>
// 			<p id="duree">Departure in 5 hours</p>
// 		</div>
// 		<div id="bloc-footer">
// 			<hr class="line" style="width: 40%" />
//     		<p class="pub">Enjoy your travels with Tickethack</p>
// 		</div>
// 	</div>
// `
//BOOKING injection du TITRE
// document.querySelector('#result-content-booking').innerHTML += `
// 	<span class="title-result-content">My Bookings</span>
// `


//--------------Supprimer un TRAJET de son CART
//Sur chaque trajet, j'ajoute une écoute.Au clic, cela l'enlève et met à jour le total des bookings
// for (let i = 0; i < document.querySelectorAll('.deleteTrip').length; i++) {
// 	document.querySelectorAll('.deleteTrip')[i].addEventListener('click', function () {
// 	this.parentNode.remove();
// 	bookings = document.querySelectorAll('.trip');
	
// });
// }
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