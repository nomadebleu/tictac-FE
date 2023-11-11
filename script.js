//Recherche des trajets ------------------------------------------------------------->
//Click SEARCH
let searchData; //permet récupérer les trajets pour après
document.querySelector("#btn-search").addEventListener("click", function () {
  fetch("http://localhost:3000/mycart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      departure: document.querySelector("#cityNameInputD").value,
      arrival: document.querySelector("#cityNameInputA").value,
      date: moment(document.querySelector("#travelDay").value).format(
        "YYYY-MM-DD"
      ),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        searchData = data;
        console.log(searchData);
        // Rajout de l'index pour identifier chaque trajet
        data.trip.forEach((trajet, index) => {
          const dateValue = trajet.date;
          const timeValue = moment(dateValue).format("HH:mm");
          document.querySelector("#content-trip").style.overflow = "scroll";
          // ACCUEIL injection TRAJET avec BOOK
          document.querySelector("#content-trip").innerHTML += `
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
          document.querySelector(".img-content-right").style.display = "none";
        });

        // Fonction pour ajouter des écouteurs à chaque trajet une fois qu'ils sont créés
        addEventListenersToBookButtons();
      } else {
        console.log("Pas de trajet");
        document.querySelector("#content-trip").innerHTML = `
				<div id="no-book-container" class="img-content-right">
            <div class="image-top">
              <img class="imgtrain" src="images/notfound.png" />
            </div>

            <div class="text-bottom">
              <p>No trip found.</p>
            </div>
          </div>
				`;
        document.querySelector("#img-accueil").style.display = "none";
      }
    });
});

// Ajout de l'écoute sur les boutons BOOK
function addEventListenersToBookButtons() {
  const bookButtons = document.querySelectorAll(".btn-success");

  bookButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const selectedTrajet = searchData.trip[index];

      //Ajout du selectedTrajet à la collection CARTS
      fetch("http://localhost:3000/mycartBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          departure: selectedTrajet.departure,
          arrival: selectedTrajet.arrival,
          time: selectedTrajet.date,
          price: selectedTrajet.price,
        }),
      })
        .then((response) => response.json())
        .then((newTrajet) => console.log("newCart saved:" + newTrajet));

            //Ajout du selectedTrajet à la collection BOOKINGS
            fetch('http://localhost:3000/mybookings',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    departure: selectedTrajet.departure,
                    arrival: selectedTrajet.arrival,
                    time:selectedTrajet.date,
                    price:selectedTrajet.price,
                    duree:selectedTrajet.date
                })
            })
              .then (response => response.json())
              .then (newBooking => 
                  console.log('newBooking saved:'+ newBooking))
            
                  //Suppression du bloc trip du bouton cliqué
            button.parentNode.remove();
            //Redirection vers cart.html
            window.location.href = 'cart.html'
        })
    })
  }
