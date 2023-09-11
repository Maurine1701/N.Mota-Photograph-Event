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
    const lightboxContainer = document.querySelector(".containerLightbox");
    const lightboxImage = lightboxContainer.querySelector(".lightbox-image");
    const lightboxReference = lightboxContainer.querySelector(".reference");
    const lightboxCategorie = lightboxContainer.querySelector(".categorie");
    const lightboxClose = lightboxContainer.querySelector(".close");
    const cataloguePhotosContainer = document.querySelector(".photoList");
    const prevButton = lightboxContainer.querySelector(".previous");
    const nextButton = lightboxContainer.querySelector(".next");

    // Vérifier si les éléments existent avant d'executer le code'
    if (
        lightboxContainer &&
        lightboxImage &&
        lightboxReference &&
        lightboxCategorie &&
        lightboxClose &&
        cataloguePhotosContainer &&
        prevButton &&
        nextButton
    ) {
        // Obtenir tous les conteneurs des posts(images) du catalogue
        const allPostContainers = Array.from(
            cataloguePhotosContainer.querySelectorAll(".bloc-photo")
        );
        let currentImageIndex;

        function openLightbox(element) {
            lightboxContainer.classList.add("open");

            // Récupérer les attributs des éléments de l'image
            const reference = element
                .querySelector(".icon")
                .getAttribute("data-reference");
            const categorie = element
                .querySelector(".icon")
                .getAttribute("data-categorie");
            const imageUrl = element
                .querySelector(".icon")
                .getAttribute("data-thumbnail-url");

            // Mettre à jour les éléments de la Lightbox avec les valeurs récupérées
            lightboxImage.src = imageUrl;
            lightboxReference.textContent = reference;
            lightboxCategorie.textContent = categorie;

            // Récupérer l'index de l'image actuellement affichée
            currentImageIndex = allPostContainers.indexOf(element);
        }

        function showPrevImage() {
            // Décrémenter l'index de l'image actuelle
            currentImageIndex--;
            // Si l'index devient inférieur à zéro, revenir à la dernière image du catalogue
            if (currentImageIndex < 0) {
                currentImageIndex = allPostContainers.length - 1;
            }
            // Récupérer le conteneur de l'image précédente
            const prevImageContainer = allPostContainers[currentImageIndex];
            // Afficher l'image précédente dans la Lightbox
            openLightbox(prevImageContainer);
        }

        function showNextImage() {
            // Incrémenter l'index de l'image actuelle
            currentImageIndex++;

            // Si l'index dépasse la dernière image du catalogue, revenir à la première image
            if (currentImageIndex >= allPostContainers.length) {
                currentImageIndex = 0;
            }
            // Récupérer le conteneur de l'image suivante
            const nextImageContainer = allPostContainers[currentImageIndex];
            // Afficher l'image suivante dans la Lightbox
            openLightbox(nextImageContainer);
        }

        // Ajouter un gestionnaire d'événement pour ouvrir la Lightbox lorsque l'utilisateur clique sur une icône d'image
        cataloguePhotosContainer.addEventListener("click", function (event) {
            if (event.target.closest(".icon")) {
                event.preventDefault();
                // Récupérer le conteneur de l'image correspondant à l'icône cliquée
                const postContainer = event.target.closest(".bloc-photo");
                // Afficher l'image dans la Lightbox
                openLightbox(postContainer);
            }
        });

        // Ajouter des gestionnaires d'événements pour les boutons "Prev" et "Next" de navigation
        prevButton.addEventListener("click", showPrevImage);
        nextButton.addEventListener("click", showNextImage);

        // Ajouter un gestionnaire d'événement pour fermer la Lightbox lorsque l'utilisateur clique sur le bouton de fermeture
        lightboxClose.addEventListener("click", function () {
            lightboxContainer.classList.remove("open");
        });
    }
});
