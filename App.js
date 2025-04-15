function loadNavigation(){
    fetch('nav.html')
        .then(response => response.text())
        .then(navHtml => {
            const body = document.querySelector('body');
            body.insertAdjacentHTML('afterbegin', navHtml); // <-- ez a kulcs!
        })
        .catch(err => console.error(err));
}

loadNavigation();
