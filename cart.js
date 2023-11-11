let panierCart = []; //C'est le panier des trajets
let totalPrix; //Montant total des trajets
let searchCart;
//document.querySelector("#btn-search").addEventListener("click", function () {
document.querySelector("#anyvoyage-cart").style.display = "none";
document.querySelector("#book-container-cart").innerHTML += `
        <span class="title-result-content">My Cart</span>
        `;
fetch("http://localhost:3000/mycartBook")
  .then((response) => response.json())
  .then((data) => {
    if (data.result) {
      searchCart = data;
      console.log(searchCart)
      data.allCarts.forEach(cart => {
        //Conversion de 'time'
        const dateValue = cart.date;
        const timeValue = moment(dateValue).format("HH:mm");

        //Création des bookings
        document.querySelector("#book-container-cart").innerHTML += `
                        <div class="trip" id="trip-${cart._id}">
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
                            <button type="button" id="delete" class="btn-success">X</button>
                        </div>
                    `;
        //Push le trajet pour calculer ensuite le prix total
        panierCart.push(cart);
        // TOTAL l'ensemble des TRAJETS trouvés avec .reduce((acc,e)=>{},départ)
        totalPrix = panierCart.reduce((cumul, cart) => cumul + cart.price, 0);
        console.log(panierCart, totalPrix);
      });
      document.querySelector("#result-content-cart").innerHTML += `
                        <div id="checkout-summary">
                            <p id="total-title">Total:     <span id="total-amount"> ${totalPrix} €</span></p>
                            <button type="button" id="purchase" class="btn btn-success">Purchase</button>
                        </div>
                    `;
    addEventListenersToDeleteButtons()
    } else {
      console.log("Notickets in your cart");
      document.querySelector("#result-content-cart").innerHTML += `
      <div id="anyvoyage-cart">
          <p id="title-cart">No tickets in your cart.</p>
          <p>Why not plan a trip?</p>
        </div>`;
    }
    //}
  

    //addEventListenersToDeleteButtons();

    //Click sur logo PURCHASE pour envoyé le CART dans la collection BOOKINGS
    document.querySelector("#purchase").addEventListener("click", function () {
      window.location.href = "bookings.html";
    });
  });
//});

// Fonction ECOUTE des boutons DELETE
function addEventListenersToDeleteButtons() {
  const deleteButtons = document.querySelectorAll("#delete");

  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const selectedCart = searchCart.allCarts[index];

      //Suppression du Cart selectionné
      fetch(`http://localhost:3000/mycartBook/${selectedCart._id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((deleteTrajet) => console.log("Cart deleted:" + deleteTrajet));
    //Suppression du bloc trip du bouton cliqué
    button.parentNode.remove();
    });
  });
}

//Click sur logo Tickethack pour revenir à l'accueil avec les trajets - celui booké
document.querySelector("#tickethack").addEventListener("click", function () {
  window.location.href = "index.html";
});
