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

<div class="main single"> 
<?php
// Définit une div principale avec la classe main single pour contenir le contenu de l'article.

// Utilise une boucle while pour parcourir les articles.
while (have_posts()) :
75*9    the_post();
?>
    <div class="post">
        <h1 class="post-title">
            <?php the_title(); // Affiche le titre de l'article ?>
        </h1>
        <p class="post-info">
            Posté le <?php the_date(); // Affiche la date de publication ?> dans <?php the_category(', '); // Affiche la catégorie à laquelle l'article appartient ?> par <?php the_author(); // Affiche l'auteur de l'article ?>.
        </p>
        <div class="post-content">
            <?php the_content(); // Affiche le contenu complet de l'article ?>
        </div>
        <div class="post-comments">
            <?php comments_template(); // Inclut le modèle de commentaires (comments_template()) pour permettre aux visiteurs de commenter l'article ?>
        </div>
    </div>
<?php
endwhile; // Fin de la boucle WordPress pour parcourir les articles.
?>
</div>

<?php
// Inclut la barre latérale du thème en appelant get_sidebar(). et inclut le pied de page du thème en appelant get_footer().
get_sidebar();
get_footer();
?>
