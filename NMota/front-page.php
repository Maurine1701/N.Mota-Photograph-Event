<?php get_header(); ?>

<body>
    <main>


<!-- Création du Hero Header-->


    <div class="containerHero">
    <?php
    // Récupération d'une image aléatoire de la médiathèque WordPress
    $args = array(
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'posts_per_page' => 1,
        'orderby' => 'rand',
    );

    // Récupération et stockage de la liste d'images avec get_posts
    $images = get_posts($args);

    // La boucle parcourt les images du tableau en récupérant l'url grâce à wp_get_attachment_image_url et le texte alternatif grâce à get_post_meta
    foreach ($images as $image) {
        $image_url = wp_get_attachment_image_url($image->ID, 'full');
        $image_alt = get_post_meta($image->ID, '_wp_attachment_image_alt', true);
    ?>
            <img class="imgHero" src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($image_alt); ?>">
        <?php } ?>
            <h1 class="titreHero"> Photographe Event </h1>
    </div>


    <!-- Création des filtres -->

    <section class="filter">

    <div class="filterLeft">

        <div class="categoryFilter">
            <select name="categorie" class="selectFilter selectCategory">

                <?php 
                // Récupère les termes de la taxonomie "categorie"
                $categorie_taxonomie = get_terms( array(
                    'taxonomy' => 'categorie',
                    'hide_empty' => true,
                    'orderby' => 'name',
                    'order' => 'DESC',
                ) );

                // Option par défaut pour la catégorie
                echo '<option value="" class="defaultOption">CATÉGORIES</option>';

                // Parcours des catégories et création des options
                foreach ($categorie_taxonomie as $iteration_categorie) {
                    echo '<option value="'.$iteration_categorie->name.'"> ' .  $iteration_categorie->name  . '</option>';
                }
                ?>

            </select>
        </div>

        <div class="formatFilter">
            <select name="format" class="selectFilter selectFormat">

                <?php 
                // Récupère les termes (formats) de la taxonomie "format"
                $format_taxonomie = get_terms( array(
                    'taxonomy' => 'format',
                    'hide_empty' => true,
                ) );

                echo '<option value="" class="defaultOption">FORMATS</option>';

                // Parcours des formats et création des options
                foreach ($format_taxonomie as $iteration_format) {
                    echo '<option value="'.$iteration_format->name.'"> ' . $iteration_format->name . '</option>';
                }
                ?>

            </select>
        </div>
    </div>

    <div class="dateFilter">
        <select name="annee" class="selectFilter selectDate">

            <option value="" class="defaultOption">trier par</option>
            <option value="old">Les plus anciennes</option>
            <option value="new">Les plus récentes</option>

        </select>
    </div>
</section>



    <!-- Création de la liste des photos -->


<div class="photoList">
    <?php
    // tableau associatif contenant les paramètres pour personnaliser la requête
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 12,
        'orderby' => 'date',
        'order' => 'ASC', 
    );

    // effectue la requête à la base de données en utilisant les paramètres définis
    $photo_query = new WP_Query($args);

    // vérifie si la requête a renvoyé des résultats
    if ($photo_query->have_posts()) :

        // cette boucle parcourt chaque photo récupérée par la requête et configure les données de la photo actuelle pour qu'elles soient disponibles 
        while ($photo_query->have_posts()) : $photo_query->the_post();
    ?>    
        <div class="containerPhotoList" id="galleryPhoto">
           <?php get_template_part('template-parts/blocPhoto'); ?>
        </div>
    <?php
        endwhile; //  fin de la boucle
        wp_reset_postdata(); //réinitialise les données de la publication (post data) à leur état d'origine
    else :
        echo 'Aucune photo trouvée.';
    endif; //  fin de la condition
    ?>
</div>

    <!-- Création de la pagination en ajax -->

<div id="loadMoreContainer">
    <button id="loadMoreButton">Charger Plus</button>
</div>




    </main>

<?php get_footer(); ?>

</body>
</html>