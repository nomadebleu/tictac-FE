// Récupére les carts stockés en db
fetch('http://localhost:3000/mycartBook')
        .then (response => response.json())
        .then(carts => {
            if (data.result) {
                // Rajout de l'index pour identifier chaque trajet
                data.carts.forEach((cart,index) => {
                    const dateValue = cart.date;
                    const timeValue = moment(dateValue).format('HH:mm');
            
                      
                    document.querySelector('#book-container-cart').innerHTML += `
                        <div class="trip" id="trip-${index}">
                            <div>
                                <p id="departure">${cart.departure}</p>
                            </div>
                            <div>
                                <p>></p>
                            </div>
                            <div>
                                <p id="arrival">${cart.arrival}</p>
                            </div>
                            <div>
                                <p id="time">${timeValue}</p>
                            </div>
                            <div>
                                <p id="price">${cart.price}€</p>
                            </div>
                            <button type="button" id="delete" class="btn btn-success">X</button>
                        </div>
                    `;
            }
        });  


    //CART:INJECTION du TITRE & CHECKOUT
    document.querySelector('#result-content-cart').innerHTML += `
        <span class="title-result-content">My Cart</span>
        
        <div id="checkout-summary">
            <p id="total-title">Total:<span id="total-amount">103€</span></p>
            <button type="button" id="purchase" class="btn btn-success">Purchase</button>
        </div>
    `;
//--------------Supprimer un TRAJET de son CART
//Sur chaque trajet, j'ajoute une écoute.Au clic, cela l'enlève et met à jour le total des bookings
for (let i = 0; i < document.querySelectorAll('.deleteTrip').length; i++) {
	document.querySelectorAll('.deleteTrip')[i].addEventListener('click', function () {
	this.parentNode.remove();
	bookings = document.querySelectorAll('.trip');
	
});
}