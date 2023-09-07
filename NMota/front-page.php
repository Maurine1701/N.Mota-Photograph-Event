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

    // Récupération de la liste d'images avec get_posts
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
            $categorie_taxonomie = get_terms( array(
                'taxonomy' => 'categorie',
                'hide_empty' => true,
                'orderby' => 'name',
                'order' => 'DESC', 
            ) );

                echo '<option value="" class="defaultOption">CATÉGORIES</option>';
                foreach ($categorie_taxonomie as $iteration_categorie) {
                    echo '<option class="option" value="'.$iteration_categorie->name.'"> ' .  $iteration_categorie->name  . '</option>';
                }

            
            ?>
            </select>
        </div>



        <div class="formatFilter"> 
            <select name="format" class="selectFilter selectFormat">
            <?php 
                $format_taxonomie = get_terms( array(
                    'taxonomy' => 'format',
                    'hide_empty' => true,

                ) );
                
                    echo '<option value="" class="defaultOption">FORMATS</option>';
                    foreach ($format_taxonomie as $iteration_format) {
                        echo '<option class="option" value="'.$iteration_format->name.'"> ' . $iteration_format->name . '</option>';
                    }

            ?>
            </select>
        </div>
    </div>
        <div class="dateFilter">

            <select name="annee" class="selectFilter selectDate">
                <option value="" class="defaultOption">trier par</option>
                <option class="option" value="old">Les plus anciennes</option>
                <option class="option" value="new">Les plus récentes</option>
            </select>
        </div>
    </section>


    <!-- Création de la liste des photos -->


<div class="photoList">
    <?php
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 12,
        'orderby' => 'date',
        'order' => 'ASC', 
    );

    $photo_query = new WP_Query($args);

    if ($photo_query->have_posts()) :
        while ($photo_query->have_posts()) : $photo_query->the_post();
    ?>    
        <div class="containerPhotoList" id="galleryPhoto">
           <?php get_template_part('template-parts/blocPhoto'); ?>
        </div>
    <?php
        endwhile;
        wp_reset_postdata();
    else :
        echo 'Aucune photo trouvée.';
    endif;
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