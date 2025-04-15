function Delete(neptun, id){
    const confirmed = confirm("Biztosan törölni szeretnéd ezt az autót?");
  if (!confirmed) return;

  fetch(`https://iit-playground.arondev.hu/api/${neptun}/car/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Törlés sikertelen');
      }
      alert("Sikeres törlés!");
      ListCars(neptun);
    })
    .catch(error => {
      document.getElementById('messages').innerText = `Hiba: ${error.message}`;
    });
}