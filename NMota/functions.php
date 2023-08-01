<?php
function add_enqueue_scripts() {
    // charge le fichier style.css
    wp_enqueue_style( 'style', get_stylesheet_uri() );
    
}
add_action( 'wp_enqueue_scripts', 'add_enqueue_scripts' );



function NMota_menus() {
    // Enregistre les emplacements de menu avec leurs noms respectifs
    register_nav_menus( array(
        'header' => 'Menu principal',
        'footer' => 'Menu pied de page',
    ) );
}
add_action( 'init', 'NMota_menus' );

?>