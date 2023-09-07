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

// Fonction pour mettre à jour la liste d'URLs d'images

const imageUrls = []; // Tableau pour stocker les URLs des images
let currentImageIndex = 0; // On définit une variable currentImageIndex à 0 pour suivre l'index de l'image actuellement affichée.

function updateImageUrls() {
    imageUrls.length = 0; // Réinitialise le tableau

    // Parcourir chaque élément ayant les classes .containerPhotoList ou .containerImg
    $('.containerPhotoList, .containerImg').each(function () {
        const imageUrl = $(this).find('img').attr('src'); // extraction de l'URL de l'image contenue à l'intérieur de cet élément
        imageUrls.push(imageUrl); // Ajout de l'URL de l'image au tableau
    });
}



// ajout d'un événement au clic pour l'icône de plein écran

$(document).on('click', '.iconFullscreen', function () {
    // on recherche l'index de l'image cliquée dans le tableau imageUrls en utilisant la méthode indexOf
    const clickedImageIndex = imageUrls.indexOf($(this).closest('.containerPhotoList, .containerImg').find('img').attr('src'));

    // appelle la fonction openLightbox pour ouvrir la lightbox avec l'index de l'image cliquée
    openLightbox(clickedImageIndex);
});



// Fonction pour ouvrir la lightbox avec l'index de l'image

function openLightbox(index) {
    const imageUrl = imageUrls[index];

    // Trouver le conteneur correspondant à l'index
    const container = $('.containerPhotoList').eq(index);

    // Extraire la référence et la catégorie de l'image à partir des données de l'élément HTML
    const reference = container.find('.lightboxImage').data('reference');
    const category = container.find('.lightboxImage').data('categorie');

    // Mettre à jour les éléments HTML de la lightbox avec les informations de l'image
    $('.lightboxImage').attr('src', imageUrl);
    $('.refLightbox').text(reference);
    $('.catLightbox').text(category);

    currentImageIndex = index; // Mettre à jour l'index de l'image actuellement affichée
    $('.containerLightbox').show(); // Afficher la lightbox
    updateImageUrls(); // Mettre à jour les URLs d'images
}

// Fonction pour mettre à jour les informations de l'image affichée
function updateImageInfo() {
    // Récupérer les informations de l'image à partir des éléments HTML
    const reference = $('h2').text();
    const category = $('.h3').text();

    // Mettre à jour les éléments HTML appropriés avec les informations de l'image
    $('.refLightbox').text(reference);
    $('.catLightbox').text(category);
}

// Gestionnaire de clic pour la fermeture de la lightbox
$('.closeLightbox').on('click', function () {
    $('.containerLightbox').hide(); // Cacher la lightbox
});

// Gestionnaire de clic pour la flèche droite
$('.rightArrow').on('click', function () {
    if (currentImageIndex < imageUrls.length - 1) {
        currentImageIndex++;
        openLightbox(currentImageIndex); // Ouvrir la lightbox avec l'image suivante
    }
});

// Gestionnaire de clic pour la flèche gauche
$('.leftArrow').on('click', function () {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        openLightbox(currentImageIndex); // Ouvrir la lightbox avec l'image précédente
    }
});

// Appel initial pour mettre à jour les URL d'images
updateImageUrls();
