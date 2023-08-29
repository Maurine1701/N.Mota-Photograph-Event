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

    let page = 2;
    let loading = false;

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


// Transforme le style des filtres au clic 


jQuery(document).ready(function ($) {
    $('.selectFilter').click(function () {
        $(this).toggleClass('active');
    });
});



// changement de photos à la selection de filtres

jQuery(document).ready(function ($) {
    let selectedCategory = ''; // Variable pour stocker la catégorie sélectionnée
    let selectedFormat = '';   // Variable pour stocker le format sélectionné
    let selectedDate = '';     // Variable pour stocker la date sélectionnée

    // Transforme le style des filtres au clic
    $('.selectFilter').click(function () {
        $(this).toggleClass('active');
    });

    // Gère le changement de sélection de catégorie
    $('.selectCategory').change(function () {
        selectedCategory = $(this).val(); // Met à jour la catégorie sélectionnée
        filterPhotos();
    });

    // Gère le changement de sélection de format
    $('.selectFormat').change(function () {
        selectedFormat = $(this).val(); // Met à jour le format sélectionné
        filterPhotos();
    });

    // Gère le changement de sélection de date
    $('.selectDate').change(function () {
        selectedDate = $(this).val(); // Met à jour la date sélectionnée
        filterPhotos();
    });

    function filterPhotos() {
        $.ajax({
            url: ajaxurl,
            type: 'post',
            data: {
                action: 'filter_photos',
                category: selectedCategory,
                format: selectedFormat,
                date: selectedDate,
            },
            success: function (response) {
                $('.photoList').html(response);
            }
        });
    }
});


// gestion lightbox


document.addEventListener("DOMContentLoaded", function () {

    const containerLightbox = document.querySelector('.containerLightbox');
    const lightboxImage = document.querySelector('.lightboxImage');
    const closeLightbox = document.querySelector('.closeLightbox');
    const rightArrow = document.querySelector('.rightArrow');
    const leftArrow = document.querySelector('.leftArrow');
    const iconFullscreenImages = document.querySelectorAll('.iconFullscreen');

    let currentImageIndex = 0;

    iconFullscreenImages.forEach((image, index) => {
        image.addEventListener('click', function (e) {
            currentImageIndex = index;
            lightboxImage.src = e.target.parentElement.parentElement.children[0].src;
            containerLightbox.style.display = 'block';
        });
    });

    closeLightbox.addEventListener('click', function () {
        containerLightbox.style.display = 'none';
    });

    // Fonction de mise à jour des images
    function updateBanner() {
        lightboxImage.src = iconFullscreenImages[currentImageIndex].parentElement.parentElement.children[0].src;
    }

    // Fonction pour la fleche suivante
    function nextSlide() {
        currentImageIndex = currentImageIndex + 1
        updateBanner();
    }


    // Fonction pour la fleche precedente
    function previousSlide() {
        currentImageIndex = currentImageIndex - 1
        updateBanner();
    }

    // ajout d'un evenement au clic sur les fleches
    rightArrow.addEventListener('click', function () {
        nextSlide();
    });

    leftArrow.addEventListener('click', function () {
        previousSlide();
    });
});