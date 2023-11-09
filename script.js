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
            
                    // RETRAIT des IMAGES & MESS avec DISPLAY NONE
                    document.querySelector('.img-content-right').style.display = 'none';
                    //Push le trajet pour calculer ensuite le prix total
                    bookings.push(trajet)
                    // TOTAL l'ensemble des TRAJETS trouvés avec .reduce((acc,e)=>{},départ)
                    total = bookings.reduce((cumul, trajet) => cumul + trajet.price, 0);
                    console.log(bookings,total);
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

            // Conversion de la date
            const dateObject = new Date(selectedTrajet.date);

            // Utilisation de toISOString pour formater la date pour l'intégrer à l'URL
            const timeValue = dateObject.toISOString();
            
            //Suppression du bloc trip du bouton cliqué
            button.parentNode.remove();

            //Création d'un newCart en db
            fetch('http://localhost:3000/mycart',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    departure: selectedTrajet.departure,
                    arrival: selectedTrajet.arrival,
                    date:dateObject,
                    time:timeValue,
                    price:selectedTrajet.price
                })
            })
            .then (response => response.json())
            .then (newData => {
                console.log(newData)
                //Redirection vers cart.html
            window.location.href = 'cart.html';
            })

            
        });
    });
}



	    
		
		

		
	
   







