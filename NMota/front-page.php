<?php get_header(); ?>

<body>
    <main>
    <div class="containerHero">
    <?php
    // Récupération d'une image aléatoire de la médiathèque WordPress
    $args = array(
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'posts_per_page' => 1,
        'orderby' => 'rand',
    );

    // Récupération de la liste d'images avec get_posts
    $images = get_posts($args);

    // La boucle parcourt les images du tableau en récupérant l'url grâce à wp_get_attachment_image_url et le texte alternatif grâce à get_post_meta
    foreach ($images as $image) {
        $image_url = wp_get_attachment_image_url($image->ID, 'full');
        $image_alt = get_post_meta($image->ID, '_wp_attachment_image_alt', true);
    ?>
            <img class="imgHero" src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($image_alt); ?>">
        <?php } ?>
            <h2 class="titreHero"> Photographe Event </h2>
    </div>
    </main>

<?php get_footer(); ?>

</body>
</html>