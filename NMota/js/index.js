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

// affichage navigation detail photo survol

document.addEventListener('DOMContentLoaded', function () {

    // Sélection de tous les éléments necessaires
    const containerImgArrows = document.querySelector('.containerImgArrows');
    const arrowLeft = document.querySelector('.arrowLeft');
    const arrowRight = document.querySelector('.arrowRight');
    const arrowLinks = document.querySelectorAll('.arrowLink');
    const thumbnailImage = document.querySelector('.img-arrows');

    arrowLinks.forEach(arrowLink => {
        // Lorsque le curseur entre dans la flèche
        arrowLink.addEventListener('mouseenter', function () {
            // Obtenez l'URL de l'image miniature à partir de l'attribut data-thumbnail
            const thumbnailUrl = this.getAttribute('data-thumbnail');
            // Mettez à jour l'URL de l'image miniature
            thumbnailImage.src = thumbnailUrl;
        });
    });

    // Lorsque le curseur entre dans la flèche gauche
    arrowLeft.addEventListener('mouseover', function () {
        // Afficher le conteneur de l'image miniature
        containerImgArrows.style.display = 'block';
    });

    // Lorsque le curseur quitte la flèche gauche
    arrowLeft.addEventListener('mouseout', function () {
        // Masquer le conteneur de l'image miniature
        containerImgArrows.style.display = 'none';
    });

    // Lorsque le curseur entre dans la flèche droite
    arrowRight.addEventListener('mouseover', function () {
        // Afficher le conteneur de l'image miniature
        containerImgArrows.style.display = 'block';
    });

    // Lorsque le curseur quitte la flèche droite
    arrowRight.addEventListener('mouseout', function () {
        // Masquer le conteneur de l'image miniature
        containerImgArrows.style.display = 'none';
    });
});

// changement de photos à la selection de filtres

jQuery(document).ready(function ($) {
    // Variables pour stocker les filtres sélectionnés
    let selectedCategory = '';
    let selectedFormat = '';
    let selectedDate = '';

    // Transforme le style des filtres au clic
    $('.selectFilter').click(function () {
        $(this).toggleClass('active'); // Lorsqu'un filtre est cliqué, cette ligne ajoute ou supprime la classe 'active'
    });

    // Gère le changement de sélection de catégorie
    $('.selectCategory').change(function () {
        selectedCategory = $(this).val(); // Met à jour la variable selectedCategory avec la valeur de la catégorie sélectionnée
        filterPhotos(); // Appelle la fonction pour filtrer les photos
    });

    // Gère le changement de sélection de format
    $('.selectFormat').change(function () {
        selectedFormat = $(this).val(); // Met à jour la variable selectedFormat avec la valeur du format sélectionné
        filterPhotos(); // Appelle la fonction pour filtrer les photos
    });

    // Gère le changement de sélection de date
    $('.selectDate').change(function () {
        selectedDate = $(this).val(); // Met à jour la variable selectedDate avec la valeur de la date sélectionnée
        filterPhotos(); // Appelle la fonction pour filtrer les photos
    });

    // Fonction pour filtrer les photos
    function filterPhotos() {
        // Effectue une requête AJAX pour obtenir les photos filtrées
        $.ajax({
            url: ajaxurl, // URL vers le script WordPress qui traitera la requête
            type: 'post', // Méthode de la requête
            data: {
                action: 'filter_photos', // Action à effectuer côté serveur
                category: selectedCategory, // Catégorie sélectionnée
                format: selectedFormat,     // Format sélectionné
                date: selectedDate,         // Date sélectionnée
            },
            success: function (response) {
                // Met à jour le contenu de la div avec la classe .photoList avec les photos filtrées
                $('.photoList').html(response);
            }
        });
    }
});


// gestion lightbox


document.addEventListener("DOMContentLoaded", function () {
    // Sélection des éléments HTML nécessaires
    const containerLightbox = document.querySelector('.containerLightbox');
    const lightboxImage = document.querySelector('.lightboxImage');
    const closeLightbox = document.querySelector('.closeLightbox');
    const rightArrow = document.querySelector('.rightArrow');
    const leftArrow = document.querySelector('.leftArrow');
    const iconFullscreenImages = document.querySelectorAll('.iconFullscreen');

    // Initialisation de l'index de l'image actuelle
    let currentImageIndex = 0;

    // Ajout des écouteurs d'événements aux images en plein écran
    iconFullscreenImages.forEach((image, index) => {
        image.addEventListener('click', function (e) {
            // Mise à jour de l'index de l'image actuelle
            currentImageIndex = index;
            // Mise à jour de l'URL de l'image dans la lightbox
            lightboxImage.src = e.target.parentElement.parentElement.children[0].src;
            // Affichage de la lightbox
            containerLightbox.style.display = 'block';
        });
    });

    // Ajout de l'écouteur d'événement pour fermer la lightbox
    closeLightbox.addEventListener('click', function () {
        containerLightbox.style.display = 'none';
    });

    // Fonction de mise à jour de l'image dans la lightbox
    function updateBanner() {
        // Mettre à jour l'URL de l'image affichée dans la lightbox
        lightboxImage.src = iconFullscreenImages[currentImageIndex].parentElement.parentElement.children[0].src;
    }

    // Fonction pour passer à la prochaine image
    function nextSlide() {
        // Incrémenter l'index de l'image actuelle
        currentImageIndex = currentImageIndex + 1;
        // Mettre à jour l'image dans la lightbox
        updateBanner();
    }

    // Fonction pour passer à l'image précédente
    function previousSlide() {
        // Décrémenter l'index de l'image actuelle
        currentImageIndex = currentImageIndex - 1;
        // Mettre à jour l'image dans la lightbox
        updateBanner();
    }

    // Ajout d'écouteurs d'événements aux flèches
    rightArrow.addEventListener('click', function () {
        // Appeler la fonction pour passer à la prochaine image
        nextSlide();
    });

    leftArrow.addEventListener('click', function () {
        // Appeler la fonction pour passer à l'image précédente
        previousSlide();
    });
});
