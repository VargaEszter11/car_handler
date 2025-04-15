function Delete(neptun, id) {
    const confirmed = confirm("Biztosan törölni szeretnéd ezt az autót?");
    if (!confirmed) return;

    fetch(`https://iit-playground.arondev.hu/api/${neptun}/car/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                const errorMessage = errorData.message || 'Törlés sikertelen';
                throw new Error(errorMessage);
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success === false) {
            throw new Error(data.message || 'Törlés sikertelen');
        }
        alert("Sikeres törlés!");
        ListCars(neptun);
    })
    .catch(error => {
        console.error('Törlési hiba:', error);
        alert(error.message);
        document.getElementById('messages').innerText = `Hiba: ${error.message}`;
    });
}