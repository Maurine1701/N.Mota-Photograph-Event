<?php

// Inclut l'en-tête du thème en appelant get_header().
get_header();
?>


<main class="main-site"> 

<?php

// Requête pour récupérer l'article du custom post type "photo" avec l'ID actuel
$args = array(
    'post_type' => 'photo', // Le custom post type "photos"
    'p' =>get_the_ID(), // Afficher uniquement un article
);

$photo_query = new WP_Query($args);

// Vérifier s'il y a des photos
if ($photo_query->have_posts()) {
    while ($photo_query->have_posts()) {
        $photo_query->the_post();

        get_template_part('template-parts/detailsPhotos');
        
    }

    // Remettre les données à zéro pour la prochaine boucle
    wp_reset_postdata();
} else {
    echo 'Aucune photo trouvée.';
}

?>

</main>


<?php
// Inclut le pied de page du thème en appelant get_footer().
get_footer();
?>
