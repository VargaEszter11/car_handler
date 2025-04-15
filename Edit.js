const carId = sessionStorage.getItem('editCarId');
const neptun = 'f9psja';

function loadCarData(carId, neptun) {
    if (carId) {
        fetch(`https://iit-playground.arondev.hu/api/${neptun}/car/${carId}`)
            .then(response => {
                console.log('Load response status:', response.status);
                if (!response.ok) {
                    throw new Error(`Hiba a betöltéskor: ${response.status}`);
                }
                return response.json();
            })
            .then(car => {
                console.log('Betöltött autó adatai:', car);
                document.querySelector('[name="brand"]').value = car.brand;
                document.querySelector('[name="model"]').value = car.model;
                document.querySelector('[name="electric"]').checked = car.electric;
                document.querySelector('[name="fuelUse"]').value = car.fuelUse;
                document.querySelector('[name="dayOfCommission"]').value = car.dayOfCommission;
                document.querySelector('[name="owner"]').value = car.owner;
            })
            .catch(error => {
                console.error('Hiba történt a betöltés során:', error);
                alert('Hiba történt a betöltés során!');
            });
    } else {
        alert('Nincs érvényes autó ID!');
    }
}

function setupFormListener(neptun) {
    document.getElementById('editCarForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const carId = sessionStorage.getItem('editCarId');
        
        if (!carId) {
            alert('Nincs érvényes autó ID!');
            return;
        }

        const updatedCar = {
            id: Number(carId),
            brand: document.querySelector('[name="brand"]').value,
            model: document.querySelector('[name="model"]').value,
            electric: document.querySelector('[name="electric"]').checked,
            fuelUse: parseFloat(document.querySelector('[name="fuelUse"]').value),
            dayOfCommission: document.querySelector('[name="dayOfCommission"]').value,
            owner: document.querySelector('[name="owner"]').value
        };

        console.log('Küldött adatok:', updatedCar);

        fetch(`https://iit-playground.arondev.hu/api/${neptun}/car`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCar),
        })
        .then(response => {
            console.log('Státusz kód:', response.status);
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || `HTTP ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success === false) {
                alert(`Hiba: ${data.message}`);
            } else {
                alert('Sikeres módosítás!');
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error('Hiba:', error);
            alert(`Módosítási hiba: ${error.message}`);
        });
    });
}

loadCarData(carId, neptun);
setupFormListener(neptun);