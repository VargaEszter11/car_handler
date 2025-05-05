const carId = sessionStorage.getItem('editCarId');
const neptun = 'f9psja';

function loadCarData(carId, neptun) {
    if (carId) {
        fetch(`https://iit-playground.arondev.hu/api/${neptun}/car/${carId}`)
            .then(response => {
                console.log('Load response status:', response.status);
                if (!response.ok) {
                    throw new Error(`Error while loading: ${response.status}`);
                }
                return response.json();
            })
            .then(car => {
                console.log('Loaded car data:', car);
                document.querySelector('[name="brand"]').value = car.brand;
                document.querySelector('[name="model"]').value = car.model;
                document.querySelector('[name="electric"]').checked = car.electric;
                document.querySelector('[name="fuelUse"]').value = car.fuelUse;
                document.querySelector('[name="dayOfCommission"]').value = car.dayOfCommission;
                document.querySelector('[name="owner"]').value = car.owner;
            })
            .catch(error => {
                console.error('Error while loading:', error);
                alert('Error while loading!');
            });
    } else {
        alert('No valid car ID!');
    }
}

function setupFormListener(neptun) {
    document.getElementById('editCarForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const carId = sessionStorage.getItem('editCarId');
        
        if (!carId) {
            alert('No valid car ID!');
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

        console.log('Sent data:', updatedCar);

        fetch(`https://iit-playground.arondev.hu/api/${neptun}/car`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCar),
        })
        .then(response => {
            console.log('Status code:', response.status);
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || `HTTP ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success === false) {
                alert(`Error: ${data.message}`);
            } else {
                alert('Successfull modification!');
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`Modification error: ${error.message}`);
        });
    });
}

loadCarData(carId, neptun);
setupFormListener(neptun);