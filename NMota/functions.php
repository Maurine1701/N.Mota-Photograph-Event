<?php
//Chargements fichier et icones

// charge le fichier style.css

function styleCSS_script() {
    wp_enqueue_style( 'style', get_stylesheet_uri() );
    
}
add_action( 'wp_enqueue_scripts', 'styleCSS_script' );




// charge le fichier Javascript

function JS_script() {
    wp_enqueue_script( 'scriptJs', get_template_directory_uri() . ' /js/index.js', array ('jquery'), '1.0');
}

add_action( 'wp_enqueue_scripts', 'JS_script' );




// charge les icones fontawesome

function Fontawesome()
{
    wp_enqueue_style('fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array());
}
add_action('wp_enqueue_scripts', 'Fontawesome');





// Enregistre les emplacements de menu avec leurs noms respectifs

function NMota_menus() {
    register_nav_menus( array(
        'header' => 'Menu principal',
        'footer' => 'Menu pied de page',
    ) );
}
add_action( 'init', 'NMota_menus' );




// active la prise en charge des images mises en avant pour miniature de navigation

function mytheme_post_thumbnails() {
    add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'mytheme_post_thumbnails' );




// enregistre un nouveau type de publication personnalisé custom post type

function create_photo_post_type() {
    register_post_type('photo', array(
        'public' => true,
        'menu_icon' => 'dashicons-camera', // Icône du menu pour ce type de publication
        'has_archive' => true,
        'rewrite' => array('slug' => 'photo'), // Réécriture de l'URL
        'labels' => array(
            'name' => 'Photos', // Nom au pluriel
            'singular_name' => 'Photo', // Nom au singulier
            'add_new_item' => 'Ajouter une photo', // Texte pour ajouter un nouvel élément
            'edit_item' => 'Modifier une photo', // Texte pour modifier un élément
        ),
    ));
}
add_action('init', 'create_photo_post_type');





//AJAX

// Fonction pour générer l'URL de l'endpoint AJAX
function custom_ajaxurl() {
    echo '<script>';
    echo 'const ajaxurl = "' . admin_url('admin-ajax.php') . '";';
    echo '</script>';
}
add_action('wp_head', 'custom_ajaxurl');





// Fonction à appeler pour la pagination AJAX pour charger plus de photos

function load_more_photos() {
    // Récupère la page actuelle depuis la requête POST
    $page = $_POST['page'];

    // Arguments de la requête pour récupérer les photos
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 12,
        'paged' => $page,
        'orderby' => 'date',
        'order' => 'ASC',
    );

   // Crée une nouvelle instance WP_Query avec les arguments définis
$photo_query = new WP_Query($args);

// Vérifie si la requête WP_Query a renvoyé des publications
if ($photo_query->have_posts()) :
    // Démarre une boucle pour parcourir chaque publication dans la requête
    while ($photo_query->have_posts()) : $photo_query->the_post();

        echo '<div class="containerPhotoList">';
        get_template_part('template-parts/blocPhoto');
        echo '</div>';

    endwhile;

    // Réinitialise les données de la requête WP_Query pour éviter les conflits avec d'autres boucles
    wp_reset_postdata();
else :
    // Si aucune publication n'a été trouvée dans la requête, affiche un contenu par défaut
    echo '';
endif;

    // Arrête l'exécution de WordPress après cette réponse AJAX
    die();
}
add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');




// gére des requêtes AJAX pour filtrer les photos et les afficher 

function filter_photos() {
    // Récupère les filtres depuis la requête POST
    $category = $_POST['category'];
    $format = $_POST['format'];
    $date = $_POST['date'];

    // Arguments de la requête pour filtrer les photos
    $args = array(
        'post_type' => 'photo',      // Type de publication personnalisé 'photo'
        'posts_per_page' => -1,     // Nombre de photos par page (-1 pour toutes les photos)
        'orderby' => 'date',        // Tri par date
        'order' => 'ASC',          // Tri dans l'ordre décroissant (du plus récent au plus ancien)
        'tax_query' => array(),     // Initialisation d'une tax_query pour les filtres taxonomiques
    );

    // Ajoute des taxonomiques si des filtres sont définis
    if (!empty($category)) { // vérifie si la variable $category n'est pas vide
        $args['tax_query'][] = array( // récupére et stocke dans le tableau que les articles qui appartiennent à la variable $category
            'taxonomy' => 'categorie', //  spécifie la taxonomie sur laquelle on applique le filtre
            'field'    => 'name', // recherche de la catégorie par son nom
            'terms'    => $category, // spécifie les termes que vous souhaitez rechercher, ici ceux de la variable category
        );
    }

    if (!empty($format)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'format',
            'field'    => 'name',
            'terms'    => $format,
        );
    }

    if (!empty($date)) {
        if ($date === 'old') {
            $args['orderby'] = 'date';  // Tri par date dans l'ordre croissant (plus ancien d'abord)
            $args['order'] = 'ASC';
        } elseif ($date === 'new') {
            $args['orderby'] = 'date';  // Tri par date dans l'ordre décroissant (plus récent d'abord)
            $args['order'] = 'DESC';
        }
    }

    // Effectue la requête
    $photo_query = new WP_Query($args);

    // Vérifie si des photos ont été trouvées dans la requête WP_Query
    if ($photo_query->have_posts()) :
        // Démarre une boucle pour parcourir chaque photo trouvée
        while ($photo_query->have_posts()) : $photo_query->the_post();
            echo '<div class="containerPhotoList" id="galleryPhoto">';
            get_template_part('template-parts/blocPhoto'); // Inclut un template de bloc de photo
            echo '</div>';
        endwhile;
        wp_reset_postdata();
    else :
        echo ''; // Aucune photo trouvée
    endif;

    // Arrête l'exécution de WordPress après cette réponse AJAX
    die();
}

add_action('wp_ajax_filter_photos', 'filter_photos');
add_action('wp_ajax_nopriv_filter_photos', 'filter_photos');


?>


