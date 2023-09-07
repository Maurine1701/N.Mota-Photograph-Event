<!-- Création de la partie photos apparentées -->
    <img class="blocPhoto" src="<?php $photo = the_post_thumbnail_url("large");?>" alt="<?php the_title_attribute(); ?>">
<div class="hoverImg">
    <img class="iconFullscreen" src="<?php echo get_theme_file_uri() .'/assets/images/iconFullscreen.png';?>" alt="Icone Fullscreen"> 
    <a href="<?php echo get_permalink() ?>"><img class="hoverEye"  src="<?php echo get_theme_file_uri() .'/assets/images/iconEye.png';?>" alt="Icone Eye"> </a>
    <?php $reference = get_field('référence'); ?>
    <h2 data-reference="<?php echo esc_attr($reference); ?>"><?php echo $reference; ?></h2>
    <h3 data-categorie="<?php echo esc_attr(get_the_terms(get_the_ID(), 'categorie')[0]->name); ?>"><?php echo get_the_terms(get_the_ID(), 'categorie')[0]->name; ?></h3>
</div>   