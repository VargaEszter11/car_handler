function Delete(neptun, id) {
    const confirmed = confirm("Are you sure that you want to delete this car?");
    if (!confirmed) return;

    fetch(`https://iit-playground.arondev.hu/api/${neptun}/car/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                const errorMessage = errorData.message || 'Unsuccessful delete';
                throw new Error(errorMessage);
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success === false) {
            throw new Error(data.message || 'Unsuccessful delete');
        }
        alert("Successful delete!");
        ListCars(neptun);
    })
    .catch(error => {
        console.error('Deletion error:', error);
        alert(error.message);
        document.getElementById('messages').innerText = `Hiba: ${error.message}`;
    });
}