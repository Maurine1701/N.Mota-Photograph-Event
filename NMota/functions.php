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


function JS_script() {
    wp_enqueue_script( 'scriptJs', get_template_directory_uri() . ' /js/index.js', array ('jquery'), '1.0', true );
}

add_action( 'wp_enqueue_scripts', 'JS_script' );
?>