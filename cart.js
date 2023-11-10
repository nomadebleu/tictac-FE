let panierCart = []; //C'est le panier des trajets
let totalPrix; //Montant total des trajets
document.querySelector('#anyvoyage-cart').style.display = "none"
document.querySelector('#result-content-cart').innerHTML += `
        <span class="title-result-content">My Cart</span>
        `
fetch('http://localhost:3000/mycartBook')
	.then(response => response.json())
	.then(data => {
		console.log(data)
		data.allCarts.forEach((cart,index) => {

                    //Conversion de 'time'
                    const dateValue = cart.date;
                    const timeValue = moment(dateValue).format('HH:mm');
            
                    //Création des bookings
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
                    //Push le trajet pour calculer ensuite le prix total
                    panierCart.push(cart);
                    // TOTAL l'ensemble des TRAJETS trouvés avec .reduce((acc,e)=>{},départ)
                    totalPrix = panierCart.reduce((cumul, cart) => cumul + cart.price, 0);
                    console.log(panierCart, totalPrix);        
            })
                    document.querySelector('#result-content-cart').innerHTML += `
                        <div id="checkout-summary">
                            <p id="total-title">Total:<span id="total-amount">${totalPrix}€</span></p>
                            <button type="button" id="purchase" class="btn btn-success">Purchase</button>
                        </div>
                    `  
                    //Click sur logo PURCHASE pour envoyé le CART dans la collection BOOKINGS
                    document.querySelector("#purchase").addEventListener("click", function () {
                    window.location.href = 'bookings.html'
                    })
        });  
 
//Click sur logo Tickethack pour revenir à l'accueil avec les trajets - celui booké
document.querySelector("#tickethack").addEventListener("click", function () {
    window.location.href = 'index.html'
});







    
