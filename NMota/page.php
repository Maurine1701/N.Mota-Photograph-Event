<?php

/**
 * The template for displaying all single posts
 *
 * This is the template used to display individual posts in the "NMota" custom theme.
 * It follows the WordPress template hierarchy for single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package NMota
 * @since NMota 1.0
 */


// Inclut l'en-tête du thème en appelant get_header().
get_header();
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">

        <?php
        // Début de la boucle WordPress pour récupérer le contenu de la page
        while (have_posts()) {
            the_post();

            // Afficher le titre de la page
            the_title('<h1 class="entry-title">', '</h1>');

            // Afficher le contenu de la page
            the_content();
        }
        ?>

    </main><!-- #main -->
</div><!-- #primary -->

<?php
// Inclut la barre latérale du thème en appelant get_sidebar(). et inclut le pied de page du thème en appelant get_footer().
get_sidebar();
get_footer();

