const neptun = 'f9psja';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

function Details(neptun, id) {
    console.log('Details függvény indítva, neptun:', neptun, 'id:', id);
    
    if (!id) {
        console.error('Nincs ID megadva!');
        document.getElementById('messages').innerText = 'Hiba: Nincs autó ID megadva!';
        return;
    }

    const url = `https://iit-playground.arondev.hu/api/${neptun}/car/${id}`;
    console.log('Fetch URL:', url);

    fetch(url)
        .then(response => {
            console.log('Válasz státusz:', response.status);
            if (!response.ok) {
                throw new Error(`Sikertelen lekérdezés (${response.status})`);
            }
            return response.json();
        })
        .then(car => {
            console.log('Kapott autó adatai:', car);
            const container = document.querySelector('.car-details-container');
            
            if (!container) {
                console.error("Hiányzik a .car-details-container elem!");
                document.getElementById('messages').innerText = 'Hiba: Hiányzó HTML elem!';
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
                <div class="button-group">
                    <button onclick="editCar('${neptun}', ${car.id})">Módosítás</button>
                    <button onclick="window.location.href='index.html'">Vissza</button>
                </div>
            `;

            container.appendChild(carDiv);
            console.log('Autó adatok megjelenítve');
        })
        .catch(error => {
            console.error('Hiba történt:', error);
            document.getElementById('messages').innerText = `Hiba: ${error.message}`;
        });
}

function editCar(neptun, id) {
    console.log('editCar hívva, neptun:', neptun, 'id:', id);
    sessionStorage.setItem('editCarId', id);
    window.location.href = `edit.html?neptun=${neptun}`;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM betöltve');
    Details(neptun, id);
});