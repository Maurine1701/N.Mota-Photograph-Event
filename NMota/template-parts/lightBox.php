<div class="containerLightbox">
    <div class="fullscreenPhoto">
            <div class="leftArrow"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/arrowLeftLightbox.png" alt="Flèche précédent"></div>
            <?php
                $thumbnail_url = get_the_post_thumbnail_url(get_the_ID(), 'full');
            ?>
                <img class="lightboxImage" src="<?php echo esc_url($thumbnail_url); ?>" alt="" data-thumbnail-url="<?php echo esc_url($thumbnail_url); ?>">
            <div class="rightArrow"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/arrowRightLightbox.png" alt="Flèche suivant"></div>
        <div>
        <?php
            $reference = get_field('référence');
            $categories = get_the_terms(get_the_ID(), 'categorie');
        ?>
            <h5 class="refLightbox" data-reference="<?php echo esc_attr($reference); ?>"><?php echo $reference; ?></h5>
            <h6 class="catLightbox" data-categorie="<?php echo esc_attr($categories[0]->name); ?>"><?php echo $categories[0]->name; ?></h6>
        </div>
    </div>
    <img class="closeLightbox" src="<?php echo get_template_directory_uri(); ?>/assets/images/closeLightbox.png" alt="Croix de fermeture de la Lightbox">
</div>