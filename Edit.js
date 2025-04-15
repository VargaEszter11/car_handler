// SessionStorage vagy egyéb módszerrel tárolt autó ID
const carId = sessionStorage.getItem('carId');
const neptun = 'f9psja'; // Neptun kód, amit dinamikusan be kell állítani

if (carId) {
  // Az API URL, amely az autó adatait lekéri az id alapján
  fetch(`https://iit-playground.arondev.hu/api/${neptun}/car/${carId}`)
    .then(response => response.json())
    .then(car => {
      // A form mezők kitöltése az autó adatainak megfelelően
      document.querySelector('[name="brand"]').value = car.brand;
      document.querySelector('[name="model"]').value = car.model;
      document.querySelector('[name="electric"]').checked = car.electric;
      document.querySelector('[name="fuelUse"]').value = car.fuelUse;
      document.querySelector('[name="dayOfCommission"]').value = car.dayOfCommission;
      document.querySelector('[name="owner"]').value = car.owner;
    })
    .catch(error => {
      console.error('Hiba történt:', error);
      alert('Hiba történt a betöltés során!');
    });
} else {
  alert('Nincs érvényes autó ID!');
}

document.getElementById('editCarForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Megakadályozzuk az alapértelmezett form submitot
  
    const carId = sessionStorage.getItem('carId');
    const neptun = 'f9psja'; // Neptun kód, amit dinamikusan be kell állítani
  
    // Az új autó adatainak összegyűjtése
    const updatedCar = {
      id: carId,  // Az id itt szerepel, mert PUT kérés esetén kell
      brand: document.querySelector('[name="brand"]').value,
      model: document.querySelector('[name="model"]').value,
      electric: document.querySelector('[name="electric"]').checked,
      fuelUse: parseFloat(document.querySelector('[name="fuelUse"]').value),
      dayOfCommission: document.querySelector('[name="dayOfCommission"]').value,
      owner: document.querySelector('[name="owner"]').value
    };
  
    // PUT kérés az API felé
    fetch(`https://iit-playground.arondev.hu/api/${neptun}/car`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCar), // Az autó adatainak JSON formátumban
    })
    .then(response => response.json())
    .then(data => {
      alert('Autó adatai sikeresen módosítva!');
      // A módosított adatok megjelenítése (ha szükséges)
    })
    .catch(error => {
      console.error('Hiba történt:', error);
      alert('Hiba történt a módosítás során!');
    });
  });
  