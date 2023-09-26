<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <!-- Définit l'encodage de caractères du document en utilisant les paramètres de WordPress -->
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    
    <!-- Définit la vue portail pour la conception responsive -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Définit le titre de la page en utilisant la fonction wp_title() -->
    <title><?php wp_title(); ?></title>
    
    <!-- Inclut les scripts et les stylesheets WordPress (nécessaire pour les fonctionnalités WordPress) -->
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header class="header">
    <div class="logo">
        <!-- Affiche le logo du site depuis le répertoire du thème -->
        <img src="<?php echo get_theme_file_uri(); ?>/assets/images/LogoNathalieMota.png" alt="logo du site">
    </div>
    <nav class="navigation">
        <?php
        // Affiche le menu créé dans l'administration de WordPress
        wp_nav_menu(array(
            'theme_location' => 'header', // Emplacement du menu défini dans le thème
            'container' => false, // Ne pas inclure de conteneur supplémentaire
            'menu_class' => 'menu-principal', // Classe CSS pour le menu
        ));
        ?>
    </nav>
    <div class="burgerBtn">
        <span class="lineBurger"></span>
    </div>
</header>
