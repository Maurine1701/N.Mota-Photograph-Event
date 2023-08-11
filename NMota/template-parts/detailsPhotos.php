
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
        <h2><?php echo get_the_title(); ?></h2>
        <div class="infosPhoto">
            <p><?php echo 'RÉFÉRENCE: ' . $reference . '<br>'; ?></p>
            <p><?php echo 'CATÉGORIE: ' . $taxo_categorie[0]->name . '<br>'; ?></p>
            <p><?php echo 'FORMAT: ' . $taxo_format[0]->name . '<br>'; ?></p>
            <p><?php echo 'TYPE: ' . $type . '<br>'; ?></p>
            <p><?php echo 'ANNÉE: ' . $taxo_annee[0]->name . '<br>'; ?></p>
        </div>
    </div>
    <img src="<?php echo $photo_url; ?>" alt="<?php the_title_attribute(); ?>"><br>
</div>




<!--  Création de la partie navigation  -->


<div class="contactBtn">
        <div class="containerContact">
            <p> Cette photo vous intéresse ? </p>
            <button type="button" class="contactLink" data-reference="<?php echo $reference; ?>">Contact</button>
        </div>


    <?php

    //Flèches précédent et suivant
    $nextPost = get_next_post();
    $previousPost = get_previous_post();

    ?>

    <div class="navigationArrows">
    <?php if (!empty($previousPost) || !empty($nextPost)){ ?>
    <div class="containerImgArrows">
        <?php
        $thumbnailID = null;
        
        if (!empty($nextPost)) {
            $thumbnailID = get_post_thumbnail_id($nextPost->ID);
        } elseif (!empty($previousPost)) {
            $thumbnailID = get_post_thumbnail_id($previousPost->ID);
        }
        
        if ($thumbnailID) {
            echo wp_get_attachment_image($thumbnailID, 'thumbnail', false, ['class' => 'img-arrows']);
        }
        ?>
    </div>
    <div class="arrowsContainer">
        <?php if (!empty($previousPost)){ ?>
        <a href="<?php echo get_permalink($previousPost->ID) ?>"><img class="arrowLeft" src="<?php echo get_theme_file_uri() .'/assets/images/arrowLeft.png';?>" alt="Flèche précédent"></a>
        <?php } ?>
        <?php if (!empty($nextPost)){ ?>
        <a href="<?php echo get_permalink($nextPost->ID) ?>"><img class="arrowRight" src="<?php echo get_theme_file_uri() .'/assets/images/arrowRight.png';?>" alt="Flèche suivant"></a>
        <?php } ?>
    </div>
    <?php } ?>
</div>
</div>




<!-- Création de la partie photos apparentées -->


<div class="containerPrincipalImg">
    <p class="imgAppTitle"> vous aimerez aussi </p>
    <div class="containerImgApp">
        <?php
        $categories = get_the_terms(get_the_ID(), 'categorie');
        if ($categories && !is_wp_error($categories)) {
            $category_ids = wp_list_pluck($categories, 'term_id');

            $args = array(
                'post_type' => 'photo',
                'posts_per_page' => 2,
                'post__not_in' => array(get_the_ID()),
                'tax_query' => array(
                    array(
                        'taxonomy' => 'categorie',
                        'field' => 'term_id',
                        'terms' => $category_ids,
                    ),
                ),
            );

            $related_photos = new WP_Query($args);

            if ($related_photos->have_posts()) {
                while ($related_photos->have_posts()) {
                    $related_photos->the_post();
                    $photo_url = get_field('photo');
                    ?>
                    <div class="imgApp">
                        <div class="imgAppOnly">
                            <img src="<?php echo $photo_url; ?>" alt="<?php the_title_attribute(); ?>">
                        </div>
                    </div>
                    <?php
                }
                wp_reset_postdata();
            }
        }
        ?>
    </div>
    <button type="button" class="buttonAllPhoto">Toutes les photos</button>
</div>
</div>
