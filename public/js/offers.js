document.addEventListener("DOMContentLoaded", () => {
  const offersContainer = document.getElementById("offers-container");

  fetch("../data/offers.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Błąd podczas ładowania danych");
      }
      return response.json();
    })
    .then((offers) => {
      offersContainer.classList.add("row", "g-4");

      offers.forEach((offer) => {
        const offerCard = document.createElement("div");
        offerCard.className =
          "col-sm-12 col-md-6 col-lg-4 d-flex align-items-stretch";
        offerCard.innerHTML = `
          <div class="card shadow-sm border-0 h-100">
            <div class="image-container" style="overflow: hidden; height: 250px;">
              <img src="${offer.image}" class="card-img-top w-100 h-100" style="object-fit: cover;" alt="${offer.hotelName}" />
            </div>
            <div class="card-body">
              <h5 class="card-title fw-bold">${offer.hotelName} (${offer.destination})</h5>
              <p class="card-text text-muted">${offer.description}</p>
              <p class="card-text fs-6">Ocena: ${offer.rating} / 5</p>
              <p class="card-text fs-5 fw-semibold text-success">Cena za tydzień: ${offer.finalPrice} PLN</p>
            </div>
            <div class="card-footer bg-light border-0">
              <button class="btn btn-custom-accent text-white w-100">Zarezerwuj teraz</button>
            </div>
          </div>
        `;
        offersContainer.appendChild(offerCard);
      });
    })
    .catch((error) => {
      console.error("Błąd:", error);
      offersContainer.innerHTML = "<p>Nie udało się załadować ofert.</p>";
    });
});
