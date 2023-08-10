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

?>

