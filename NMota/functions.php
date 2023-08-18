<?php
function styleCSS_script() {
    // charge le fichier style.css
    wp_enqueue_style( 'style', get_stylesheet_uri() );
    
}
add_action( 'wp_enqueue_scripts', 'styleCSS_script' );



function NMota_menus() {
    // Enregistre les emplacements de menu avec leurs noms respectifs
    register_nav_menus( array(
        'header' => 'Menu principal',
        'footer' => 'Menu pied de page',
    ) );
}
add_action( 'init', 'NMota_menus' );


function mytheme_post_thumbnails() {
    add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'mytheme_post_thumbnails' );


function JS_script() {
    wp_enqueue_script( 'scriptJs', get_template_directory_uri() . ' /js/index.js', array ('jquery'), '1.0', true );
}

add_action( 'wp_enqueue_scripts', 'JS_script' );


function create_photo_post_type() {
    register_post_type('photo', array(
        'public' => true,
        'menu_icon' => 'dashicons-camera',
        'has_archive' => true,
        'rewrite' => array('slug' => 'photo'),

        'labels' => array(
        'name' => 'Photos',
        'singular_name' => 'Photo',
        'add_new_item' => 'ajouter une photo',
        'edit_item' => 'modifier une photo',
        ),
    ));
}
add_action('init', 'create_photo_post_type');


function load_more_photos() {
    $page = $_POST['page'];

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 12,
        'paged' => $page,
        'orderby' => 'date',
        'order' => 'ASC', 
    );

    $photo_query = new WP_Query($args);

    if ($photo_query->have_posts()) :
        while ($photo_query->have_posts()) : $photo_query->the_post();
            echo '<div class="containerPhotoList" id="galleryPhoto">';
            get_template_part('template-parts/blocPhoto');
            echo '</div>';
        endwhile;
        wp_reset_postdata();
    else :
        echo '';
    endif;

    die();
}
add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');



function filter_photos() {
    $category = $_POST['category'];
    $format = $_POST['format'];
    $date = $_POST['date'];

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => -1,
        'orderby' => 'date', // Par défaut, triez par date
        'order' => 'DESC',   // Par défaut, tri décroissant
        'tax_query' => array(),
    );

    if (!empty($category)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'categorie',
            'field'    => 'name',
            'terms'    => $category,
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
        // Logique pour trier par date
        if ($date === 'old') {
            $args['orderby'] = 'date';
            $args['order'] = 'ASC';
        } elseif ($date === 'new') {
            $args['orderby'] = 'date';
            $args['order'] = 'DESC';
        }
    }

    $photo_query = new WP_Query($args);

    if ($photo_query->have_posts()) :
        while ($photo_query->have_posts()) : $photo_query->the_post();
            echo '<div class="containerPhotoList" id="galleryPhoto">';
            get_template_part('template-parts/blocPhoto');
            echo '</div>';
        endwhile;
        wp_reset_postdata();
    else :
        echo ''; 
    endif;

    die();
}

add_action('wp_ajax_filter_photos', 'filter_photos');
add_action('wp_ajax_nopriv_filter_photos', 'filter_photos');


?>


