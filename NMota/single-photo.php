<?php

// Inclut l'en-tête du thème en appelant get_header().
get_header();
?>


<main class="main-site"> 

<?php

// Requête pour récupérer l'article du custom post type "photo" avec l'ID actuel
$args = array(
    'post_type' => 'photo', // Le custom post type "photos"
    'posts_per_page' => 1, // Afficher uniquement un article
);

$photo_query = new WP_Query($args);

// Vérifier s'il y a des photos
if ($photo_query->have_posts()) {
    while ($photo_query->have_posts()) {
        $photo_query->the_post();

        // Récupérer les custom fields avec ACF
        $photo_url = get_field('photo');
        $type = get_field('type');
        $annee = get_field('annee');
        $reference = get_field('référence');

        // Champs de Taxonomies
        $taxo_categorie = get_the_terms(get_the_ID(), 'categorie'); 
        $taxo_format = get_the_terms(get_the_ID(), 'format');

        ?>

    <div class="containerSingle">
        <div class="detailsPhoto">
            <h2><?php echo get_the_title(); ?></h2>
            <p><?php echo 'RÉFÉRENCE: ' . $reference . '<br>'; ?></p>
            <p><?php echo 'CATÉGORIE: ' . $taxo_categorie[0]->name . '<br>';?></p>
            <p><?php echo 'FORMAT: ' . $taxo_format[0]->name . '<br>';?></p>
            <p><?php echo 'TYPE: ' . $type . '<br>';?></p>
            <p><?php echo 'ANNÉE: ' . $annee . '<br>';?></p>
        </div>
        <img src="<?php echo $photo_url; ?>" alt="Photo" /><br>
    </div>

<?php
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
