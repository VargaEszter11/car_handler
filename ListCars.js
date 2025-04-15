const neptun = 'f9psja';

function ListCars(neptun){
    fetch(`https://iit-playground.arondev.hu/api/${neptun}/car`)
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
      
              carDiv.innerHTML = `
                <h3>${car.brand} ${car.model}</h3>
                <button onclick="location.href='details.html?neptun=${neptun}&id=${car.id}'">Részletek</button>
              `;
      
              container.appendChild(carDiv);
            });
          })
          .catch(error => {
            document.getElementById('messages').innerText = `Hiba: ${error.message}`;
          });
}

ListCars(neptun);