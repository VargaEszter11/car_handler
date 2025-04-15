const neptun = 'f9psja';

function ListCars(neptun){
    const url = `https://iit-playground.arondev.hu/api/${neptun}/car`;
    fetch(url)
          .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    const errorMessage = errorData.message || `Request failed with status ${response.status}`;
                    throw new Error(errorMessage);
                });
            }
            return response.json();
        })
        .then(cars => {
            const container = document.querySelector('.cars-container');
            if (!container) {
                throw new Error('Could not find cars container element');
            }
            container.innerHTML = '';
        
            if (!Array.isArray(cars) || cars.length === 0) {
                container.innerHTML = '<p class="no-cars">No cars found</p>';
                return;
            }
        
            cars.forEach(car => {
                const carDiv = document.createElement('div');
                carDiv.classList.add('car-card');
              
                const title = document.createElement('h3');
                title.textContent = `${car.brand} ${car.model}`;
              
                const detailsBtn = document.createElement('button');
                detailsBtn.textContent = 'Részletek';
                detailsBtn.addEventListener('click', () => {
                    location.href = `details.html?neptun=${neptun}&id=${car.id}`;
                });
              
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Törlés';
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    Delete(neptun, car.id);
                });
              
                carDiv.appendChild(title);
                carDiv.appendChild(detailsBtn);
                carDiv.appendChild(deleteBtn);
                container.appendChild(carDiv);
            });
            
            document.getElementById('messages').innerText = '';
        })
        .catch(error => {
            console.error('Error loading cars:', error);
            alert(error.message);
        });
}

ListCars(neptun);