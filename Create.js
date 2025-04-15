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
          try {
            const errorData = JSON.parse(errorText);
            const rawMessage = errorData.message || errorData.error || errorText;
            const cleanMessage = rawMessage
              .replace(/["{}]/g, '')
              .replace(/^error:/i, '')
              .trim();
              
            throw new Error(cleanMessage || "Ismeretlen hiba történt");
          } catch {
            const cleanMessage = errorText
              .replace(/["{}]/g, '')
              .replace(/^.*?(message|error):/i, '')
              .trim();
              
            throw new Error(cleanMessage || "Ismeretlen hiba történt");
          }
        });
      }
      return response.json();
    })
    .catch(error => {
      console.error('Teljes hiba:', error);
      alert(error.message);
      document.getElementById('messages').innerText = error.message;
    });
  });
});
