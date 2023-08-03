console.log("chargé");



/* gestion de la modale*/

// Sélection des éléments du DOM
const contactLink = document.querySelector('a[href="#contact"]');
const modaleOverlay = document.querySelector('.modaleOverlay');
const modaleContact = document.querySelector('.modaleContact');
const menuBurger = document.querySelector('.burgerBtn'); // Sélection du bouton du menu burger

// Fonction pour ouvrir la modale
function openModale() {
    modaleOverlay.classList.add('open');
}

// Fonction pour fermer la modale
function closeModale() {
    modaleOverlay.classList.remove('open');
}

// Attente du chargement complet du DOM
document.addEventListener('DOMContentLoaded', function () {
    // Vérification de l'existence des éléments avant d'ajouter des écouteurs d'événements
    if (contactLink && modaleOverlay) {
        // Ajout d'un écouteur pour le clic sur le lien de contact
        contactLink.addEventListener('click', function (event) {
            event.preventDefault();
            openModale(); // Appel de la fonction pour ouvrir la modale
        });
    }

    // Ajout d'un écouteur pour les clics sur l'ensemble du document
    document.addEventListener('click', function (event) {
        // Si l'événement provient de la modale, du lien de contact ou du menu burger, ne rien faire
        if (modaleContact && (modaleContact.contains(event.target) || (contactLink && contactLink.contains(event.target)) || menuBurger.contains(event.target))) {
            return;
        }

        // Sinon, fermer la modale
        closeModale();
    });
});


/* Responsive : Menu burger pour mobile */

document.addEventListener('DOMContentLoaded', function () {
    // Sélection des éléments bouton du menu burger et menu fullscreen
    const menuBurger = document.querySelector('.burgerBtn');
    const menuMobile = document.querySelector('.navigation');

    // Ajout d'un écouteur d'événement click au bouton de menu burger
    menuBurger.addEventListener('click', function () {
        // Ajout de la classe 'active' pour animer le bouton de menu burger
        menuBurger.classList.toggle('active');

        // Ajout de la classe 'open' pour afficher ou masquer le menu fullscreen
        menuMobile.classList.toggle('open');
    });
});




