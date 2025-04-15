function loadNavigation(){
    fetch('nav.html')
        .then(response => response.text())
        .then(navHtml => {
            const body = document.querySelector('body');
            body.insertAdjacentElement('afterbegin', navHtml);
        })
        .catch(err => console.error(err));
}

loadNavigation();