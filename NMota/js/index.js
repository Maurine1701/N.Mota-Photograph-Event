console.log("chargé");



/* gestion de la modale*/

document.addEventListener('DOMContentLoaded', function () {
    // Sélection des éléments du DOM
    const contactLink = document.querySelector('a[href="#contact"]');
    const modaleOverlay = document.querySelector('.modaleOverlay');
    const modaleContact = document.querySelector('.modaleContact');
    const contactButton = document.querySelector('.contactLink');
    const menuBurger = document.querySelector('.burgerBtn');
    const referencePhotoField = document.getElementById('reference'); // Champ de formulaire de référence

    // Fonction pour ouvrir la modale
    function openModale() {
        modaleOverlay.classList.add('open');
    }

    // Fonction pour fermer la modale
    function closeModale() {
        modaleOverlay.classList.remove('open');
    }

    // Vérification de l'existence des éléments avant d'ajouter des écouteurs d'événements
    if (contactLink && modaleOverlay) {
        // Ajout d'un écouteur pour le clic sur le lien de contact
        contactLink.addEventListener('click', function (event) {
            event.preventDefault();
            openModale(); // Appel de la fonction pour ouvrir la modale
        });
    }

    if (contactButton && modaleOverlay) {
        // Ajout d'un écouteur pour le clic sur le bouton de contact
        contactButton.addEventListener('click', function (event) {
            event.preventDefault();
            openModale(); // Appel de la fonction pour ouvrir la modale

            // Remplissage du champ de référence
            const referenceValue = contactButton.dataset.reference;
            if (referenceValue) {
                referencePhotoField.value = referenceValue;
            }
        });
    }

    // Ajout d'un écouteur pour les clics sur l'ensemble du document
    document.addEventListener('click', function (event) {
        // Si l'événement provient de la modale, du lien de contact ou du menu burger, ne rien faire
        if (modaleContact && (modaleContact.contains(event.target) || (contactLink && contactLink.contains(event.target)) || (contactButton && contactButton.contains(event.target)) || menuBurger.contains(event.target))) {
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


/* Création de la pagination ajax */

// on démarre la fonction après le chargement du dom
jQuery(document).ready(function ($) {

    var page = 2;
    var loading = false;

    // Ajout d'un gestionnaire de clic sur le bouton "chargez plus"
    $('#loadMoreButton').click(function () {
        if (!loading) {
            loading = true;
            // Charge + de photos en appelant la fonction loadMorePhotos avec le numéro de page actuel
            loadMorePhotos(page);
            page++; // et on Incrémente le numéro de page pour la prochaine fois
        }
    });

    function loadMorePhotos(page) {
        $.ajax({
            url: ajaxurl, // URL du script WordPress pour le traitement AJAX
            type: 'post',
            data: {
                action: 'load_more_photos', // on appelle la fonction wordpress créer dans le fichier function
                page: page,
            },
            success: function (response) {
                if (!response.trim()) {// on Vérifie si nous on a atteint la fin des photos et que la réponse obtenue de l'AJAX est vide
                    $('#loadMoreButton').hide(); // Cachez le bouton chargez plus
                } else {
                    // Ajoutez la réponse (nouvelles photos) à la fin de la liste existante
                    $('.photoList').append(response);
                    loading = false; // Marquez le chargement comme terminé
                }
            }
        });
    }
});








