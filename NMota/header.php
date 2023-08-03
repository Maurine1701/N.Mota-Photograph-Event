<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title(); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<header class="header">
    <div class="logo">
        <img src="<?php echo get_theme_file_uri(); ?>/assets/images/LogoNathalieMota.png" alt="logo du site">
    </div>
    <nav class="navigation">
    <?php
        // Affiche le menu créé dans l'administration de WordPress
        wp_nav_menu(array(
            'theme_location' => 'header', 
            'container' => false, 
            'menu_class' => 'menu-principal',
        ));
        ?>
    </nav>
    <div class="burgerBtn">
            <span></span>
    </div>
</header>