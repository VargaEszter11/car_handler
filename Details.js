const urlParams = new URLSearchParams(window.location.search);

const neptun = urlParams.get('neptun');  
const id = urlParams.get('id');   

if (neptun && id) {
    Details(neptun, id);
} else {
    document.getElementById('messages').innerText = "Hiba: Hiányzó paraméterek!";
}

function Details(neptun, id) {
    const url = `https://iit-playground.arondev.hu/api/${neptun}/car/${id}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Sikertelen lekérdezés');
            }
            return response.json();
        })
        .then(car => {
            const container = document.querySelector('.car-details-container');
            if (!container) {
                console.error("Hiányzik a .car-details-container elem!");
                return;
            }

            container.innerHTML = '';

            const carDiv = document.createElement('div');
            carDiv.classList.add('car-card');

            carDiv.innerHTML = `
                <h3>${car.brand} ${car.model}</h3>
                <p><strong>Elektromos:</strong> ${car.electric ? 'Igen' : 'Nem'}</p>
                <p><strong>Fogyasztás:</strong> ${car.fuelUse} l/100km</p>
                <p><strong>Forgalomba helyezés:</strong> ${car.dayOfCommission}</p>
                <p><strong>Tulajdonos:</strong> ${car.owner}</p>
            `;

            container.appendChild(carDiv);
        })
        .catch(error => {
            document.getElementById('messages').innerText = `Hiba: ${error.message}`;
        });

        console.log('car-details-container:', document.querySelector('.car-details-container'));

}

Details(neptun, id);