const neptun = 'f9psja';

function ListCars(neptun){
    const url = `https://iit-playground.arondev.hu/api/${neptun}/car`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
              throw new Error('Sikertelen lekérdezés');
            }
            return response.json();
          })
          .then(cars => {
            const container = document.querySelector('.cars-container');
            container.innerHTML = '';
      
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
                deleteBtn.addEventListener('click', () => {
                  Delete(neptun, car.id);
                });
              
                carDiv.appendChild(title);
                carDiv.appendChild(detailsBtn);
                carDiv.appendChild(deleteBtn);
                container.appendChild(carDiv);
              });
              
          })
          .catch(error => {
            document.getElementById('messages').innerText = `Hiba: ${error.message}`;
          });
}

ListCars(neptun);