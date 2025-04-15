const neptun = 'f9psja';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

function Details(neptun, id) {
    console.log('Details function started, neptun:', neptun, 'id:', id);
    
    if (!id) {
        console.error('No ID provided!');
        document.getElementById('messages').innerText = 'Error: No car ID provided!';
        return;
    }

    const url = `https://iit-playground.arondev.hu/api/${neptun}/car/${id}`;
    console.log('Fetch URL:', url);

    fetch(url)
        .then(response => {
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                return response.json().then(errorData => {
                    const errorMessage = errorData.message || `Request failed (${response.status})`;
                    throw new Error(errorMessage);
                });
            }
            return response.json();
        })
        .then(car => {
            if (!car.id) {
                throw new Error('Invalid car data received');
            }

            console.log('Received car data:', car);
            const container = document.querySelector('.car-details-container');
            
            if (!container) {
                throw new Error('Missing .car-details-container element!');
            }

            container.innerHTML = '';

            const carDiv = document.createElement('div');
            carDiv.classList.add('car-card');

            carDiv.innerHTML = `
                <h3>${car.brand} ${car.model}</h3>
                <p><strong>Electric:</strong> ${car.electric ? 'Yes' : 'No'}</p>
                <p><strong>Fuel consumption:</strong> ${car.fuelUse} l/100km</p>
                <p><strong>Commission date:</strong> ${car.dayOfCommission}</p>
                <p><strong>Owner:</strong> ${car.owner}</p>
                <div class="button-group">
                    <button onclick="editCar('${neptun}', ${car.id})">Edit</button>
                    <button onclick="window.location.href='index.html'">Back</button>
                </div>
            `;

            container.appendChild(carDiv);
            document.getElementById('messages').innerText = '';
        })
        .catch(error => {
            console.error('Error occurred:', error);
            alert(error.message);
        });
}

function editCar(neptun, id) {
    console.log('editCar called, neptun:', neptun, 'id:', id);
    sessionStorage.setItem('editCarId', id);
    window.location.href = `edit.html?neptun=${neptun}`;
}

// Add Delete function if not already present
function Delete(neptun, id) {
    const confirmed = confirm("Are you sure you want to delete this car?");
    if (!confirmed) return;

    fetch(`https://iit-playground.arondev.hu/api/${neptun}/car/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Delete failed');
            });
        }
        alert("Successfully deleted!");
        window.location.href = 'index.html';
    })
    .catch(error => {
        alert(error.message);
        document.getElementById('messages').innerText = `Error: ${error.message}`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    Details(neptun, id);
});