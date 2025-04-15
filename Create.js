const neptun = 'f9psja';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addCarForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    
    const car = {
      brand: formData.get('brand'),
      model: formData.get('model'),
      fuelUse: parseFloat(formData.get('fuelUse')) || 0,
      owner: formData.get('owner'),
      dayOfCommission: formData.get('dayOfCommission'),
      electric: formData.get('electric') === 'on'
    };

    fetch(`https://iit-playground.arondev.hu/api/${neptun}/car`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(errorText => {
          throw new Error(`Hiba: ${response.status} - ${errorText}`);
        });
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('messages').innerText = `Sikeresen hozzáadtuk az autót: ${data.id}`;
      form.reset();
    })
    .catch(error => {
      document.getElementById('messages').innerText = `Hiba: ${error.message}`;
    });
  });
});
