const carId = sessionStorage.getItem('editCarId');
const neptun = 'f9psja';

if (carId) {
  fetch(`https://iit-playground.arondev.hu/api/${neptun}/car/${carId}`)
    .then(response => response.json())
    .then(car => {
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
    event.preventDefault();
  
    const carId = sessionStorage.getItem('editCarId');
    const neptun = 'f9psja';
  
    const updatedCar = {
      id: carId,
      brand: document.querySelector('[name="brand"]').value,
      model: document.querySelector('[name="model"]').value,
      electric: document.querySelector('[name="electric"]').checked,
      fuelUse: parseFloat(document.querySelector('[name="fuelUse"]').value),
      dayOfCommission: document.querySelector('[name="dayOfCommission"]').value,
      owner: document.querySelector('[name="owner"]').value
    };
  
    fetch(`https://iit-playground.arondev.hu/api/${neptun}/car`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCar),
    })
    .then(response => response.json())
    .then(data => {
      alert('Autó adatai sikeresen módosítva!');
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error('Hiba történt:', error);
      alert('Hiba történt a módosítás során!');
    });
  });
  