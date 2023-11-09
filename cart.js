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
//--------------Supprimer un TRAJET de son CART
//Sur chaque trajet, j'ajoute une écoute.Au clic, cela l'enlève et met à jour le total des bookings
for (let i = 0; i < document.querySelectorAll('.deleteTrip').length; i++) {
	document.querySelectorAll('.deleteTrip')[i].addEventListener('click', function () {
	this.parentNode.remove();
	bookings = document.querySelectorAll('.trip');
	
});
}