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
            event.preventDefault(); // empêche le comportement par défaut
            openModale(); // Appel de la fonction pour ouvrir la modale
        });
    }

    if (contactButton && modaleOverlay) {
        // Ajout d'un écouteur pour le clic sur le bouton de contact
        contactButton.addEventListener('click', function (event) {
            event.preventDefault();
            openModale(); // Appel de la fonction pour ouvrir la modale

            // Remplissage du champ de référence
            // Récupère la valeur de l'attribut "data-reference" du bouton de contact
            const referenceValue = contactButton.dataset.reference;

            // Vérifie si la valeur récupérée existe (n'est pas null ou undefined)
            if (referenceValue) {
                // Si la valeur existe, assigne cette valeur au champ de formulaire avec l'ID "referencePhotoField"
                referencePhotoField.value = referenceValue;
            }

        });
    }




    // Ajout d'un écouteur pour les clics sur l'ensemble du document pour pouvoir fermer la modale en cliquant hors de la modale
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
        // Ajout de la classe 'active' sur le bouton de menu burger pour ouvrir
        menuBurger.classList.toggle('active');

        // Ajout de la classe 'open' pour afficher ou masquer le menu fullscreen
        menuMobile.classList.toggle('open');
    });
});






/* Création de la pagination ajax */


// on démarre la fonction après le chargement du dom
jQuery(document).ready(function ($) {

    // initialisation des variable
    let page = 2; //deuxieme page 
    let loading = false; //chargement n'est pas en cours

    // Ajout d'un gestionnaire de clic sur le bouton "chargez plus"
    $('#loadMoreButton').click(function () {
        if (!loading) { // vérifie si la variable loading est définie comme false et on la bascule en true (chargement en cours)
            loading = true;
            // Charge plus de photos en appelant la fonction loadMorePhotos avec le numéro de page actuel
            loadMorePhotos(page);
            page++; // Incrémente le numéro de page pour la prochaine fois
        }
    });


    function loadMorePhotos(page) {
        // Effectue une requête AJAX vers le script WordPress de traitement
        $.ajax({
            url: ajaxurl, // URL du script WordPress pour le traitement AJAX
            type: 'post', // Type de requête POST
            data: {
                action: 'load_more_photos', // Action WordPress définie dans le fichier functions.php
                page: page, // Numéro de page pour obtenir les photos suivantes
            },
            success: function (response) {
                // La fonction de rappel en cas de succès
                if (!response.trim()) {
                    // Si la réponse est vide, cela signifie que nous avons atteint la fin des photos
                    $('#loadMoreButton').hide(); // Cachez le bouton "chargez plus"
                } else {
                    // Si la réponse contient de nouvelles photos
                    // Ajoutez la réponse (nouvelles photos) à la fin de la liste existante
                    $('.photoList').append(response);

                    // Marquez le chargement comme terminé en réinitialisant la variable "loading"
                    loading = false;
                }
            }
        });
    }
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
        // Lorsque le curseur est sur les flèches
        arrowLink.addEventListener('mouseenter', function () {
            // Obtenez l'URL de l'image miniature à partir de l'attribut data-thumbnail
            const thumbnailUrl = this.getAttribute('data-thumbnail');
            // Mettez à jour l'URL de l'image miniature
            thumbnailImage.src = thumbnailUrl;
        });
    });

    // Lorsque le curseur est sur la flèche gauche
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
        $(this).toggleClass('active'); // Lorsqu'un filtre est cliqué, cette ligne ajoute la classe 'active'
    });

    // Gère le changement de sélection de catégorie
    $('.selectCategory').change(function () { // exécutée chaque fois que la valeur du menu déroulant change.
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
                action: 'filter_photos', // Action à effectuer côté serveur dans le fichier fonction 
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
    const cataloguePhotosContainers = document.querySelectorAll(".photoList, .containerPrincipalSingle");
    const prevButton = lightboxContainer.querySelector(".previous");
    const nextButton = lightboxContainer.querySelector(".next");

    // Vérifier si les éléments existent avant d'exécuter le code
    if (
        lightboxContainer &&
        lightboxImage &&
        lightboxReference &&
        lightboxCategorie &&
        lightboxClose &&
        cataloguePhotosContainers.length > 0 &&
        prevButton &&
        nextButton
    ) {
        // stocke tous les images des posts du catalogue
        const allPostContainers = Array.from(
            document.querySelectorAll(".bloc-photo, .bloc-photo-detail")
        );
        let currentImageIndex; // initialisation de la variable qui stocke l'index

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
        cataloguePhotosContainers.forEach((container) => {
            container.addEventListener("click", function (event) {
                if (event.target.closest(".iconFullscreen")) { //  vérifie si un événement a été déclenché au clic sur l'icone fullscreen
                    event.preventDefault();
                    // stocke les photos contenus dans l'une des classes spécifiéeset qui est l'ascendant le plus proche de l'élément
                    const postContainer = event.target.closest(".bloc-photo, .bloc-photo-detail");
                    // Afficher l'image dans la Lightbox
                    openLightbox(postContainer);
                }
            });
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

