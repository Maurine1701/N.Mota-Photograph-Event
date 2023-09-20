
<!-- Création de la partie détails -->

<?php

// Récupérer les custom fields avec ACF
    $photo_url = get_field('photo');
    $type = get_field('type');
    $reference = get_field('référence');

// Champs de Taxonomies
    $taxo_categorie = get_the_terms(get_the_ID(), 'categorie'); 
    $taxo_format = get_the_terms(get_the_ID(), 'format');
    $taxo_annee = get_the_terms(get_the_ID(), 'annee');

?>

<div class="containerPrincipalSingle">
    <div class="containerSingle">
        <div class="detailsPhoto">
            <!-- Affiche le titre de l'article -->
            <h2><?php echo get_the_title(); ?></h2>

            <div class="infosPhoto">
                <!-- Affiche les informations de la photo -->
                <p><?php echo 'RÉFÉRENCE: ' . $reference . '<br>'; ?></p>
                <p><?php echo 'CATÉGORIE: ' . $taxo_categorie[0]->name . '<br>'; ?></p>
                <p><?php echo 'FORMAT: ' . $taxo_format[0]->name . '<br>'; ?></p>
                <p><?php echo 'TYPE: ' . $type . '<br>'; ?></p>
                <p><?php echo 'ANNÉE: ' . $taxo_annee[0]->name . '<br>'; ?></p>
            </div>
        </div>

        <div class="bloc-photo-detail">
            <!-- Affiche la photo liée à l'article -->
            <img class="blocPhoto" src="<?php echo $photo_url; ?>" alt="<?php the_title_attribute(); ?>">

            <div class="hoverImg">
                <!-- Ajoute une icône pour l'expansion de la photo -->
                <a class="icon" href="#" data-thumbnail-url="<?php echo $photo_url; ?>">
                    <i class="fa fa-expand iconFullscreen"></i>
                </a>
            </div>
        </div>
    </div>



    <!--  Création de la partie navigation  -->


    <div class="contactBtn">
        <div class="containerContact">
            <p> Cette photo vous intéresse ? </p>
            <button type="button" class="contactLink" data-reference="<?php echo $reference; ?>">Contact</button>
        </div>


        <?php

        // Obtient les articles précédents et suivants avev les fleches
        $nextPost = get_next_post();
        $previousPost = get_previous_post();
        ?>
        
        <div class="navigationArrows">
            <?php if (!empty($previousPost) || !empty($nextPost)){ ?>
            <!-- Vérifie si des articles précédents ou suivants existent -->
        
            <div class="containerImgArrows">
                <?php
                $thumbnailID = null; // initialisation variable
        
                if (!empty($nextPost)) {
                    // Si un article suivant existe, obtient l'ID de son image à la une
                    $thumbnailID = get_post_thumbnail_id($nextPost->ID);
                } elseif (!empty($previousPost)) {
                    // Si un article précédent existe, obtient l'ID de son image à la une
                    $thumbnailID = get_post_thumbnail_id($previousPost->ID);
                } 
        
                if ($thumbnailID) {
                    // Si une image existe, affiche cette image
                    echo wp_get_attachment_image($thumbnailID, 'thumbnail', false, ['class' => 'img-arrows']);
                }
                ?>
            </div>
        
            <div class="arrowsContainer">
                <?php if (!empty($previousPost)){ ?>
                <!-- Si un article précédent existe, affiche l'article précédent' -->
                <a href="<?php echo get_permalink($previousPost->ID) ?>" class="arrowLink arrowLinkPrevious" data-thumbnail="<?php echo wp_get_attachment_image_url(get_post_thumbnail_id($previousPost->ID), 'thumbnail'); ?>">
                    <img class="arrowLeft" src="<?php echo get_theme_file_uri() .'/assets/images/arrowLeft.png';?>" alt="Flèche précédent">
                </a>
                <?php } ?>
                <?php if (!empty($nextPost)){ ?>
                <!-- Si un article suivant existe, affiche l'article suivant -->
                <a href="<?php echo get_permalink($nextPost->ID) ?>" class="arrowLink arrowLinkNext" data-thumbnail="<?php echo wp_get_attachment_image_url(get_post_thumbnail_id($nextPost->ID), 'thumbnail'); ?>">
                    <img class="arrowRight" src="<?php echo get_theme_file_uri() .'/assets/images/arrowRight.png';?>" alt="Flèche suivant">
                </a>
                <?php } ?>
            </div>
            <?php } ?>
        </div>
        </div>
        



    <!-- intégration de la partie photos apparentées -->

    <p class="imgAppTitle"> vous aimerez aussi </p>
    <div class="containerPrincipalImg">
        <?php
        // récupère et stocke les catégories de l'article actuel
        $categories = get_the_terms(get_the_ID(), 'categorie');

        //  vérifie si la variable $categories contient des données valides et n'est pas une erreur WordPress
        if ($categories && !is_wp_error($categories)) { 
            // Récupère les IDs des catégories de l'article actuel
            $category_ids = wp_list_pluck($categories, 'term_id');

            // Paramètres de la requête pour obtenir des articles liés
            $args = array(
                'post_type' => 'photo',
                'posts_per_page' => 2, // Limite le nombre d'articles liés à afficher
                'post__not_in' => array(get_the_ID()), // Exclut l'article actuel
                'tax_query' => array(
                    array(
                        'taxonomy' => 'categorie',
                        'field' => 'term_id',
                        'terms' => $category_ids, // Affiche les articles liés à des catégories similaires
                    ),
                ),
            );

            // Crée une nouvelle requête WP_Query pour obtenir des photos liées
            $related_photos = new WP_Query($args);

                if ($related_photos->have_posts()) {
                // si la requête a trouvé des photos liées

                while ($related_photos->have_posts()) {
                // boucle pour parcourir les photos liées une par une
                $related_photos->the_post();
                // Définit l'article actuel de la boucle comme l'article lié en cours

                $photo_url = get_field('photo');
                // Obtient l'URL de la photo liée à partir du champ personnalisé 'photo'
                ?>  

                    <div class="containerImg">
                        <?php get_template_part('template-parts/blocPhoto'); ?>
                    </div>

                    <?php
                }
                wp_reset_postdata(); // Réinitialise les données de la requête
            }
        }
        ?>
</div>
<button type="button" class="buttonAllPhoto">
    <a href="<?php echo home_url(); ?>#galleryPhoto">Toutes les photos</a>
</button>


