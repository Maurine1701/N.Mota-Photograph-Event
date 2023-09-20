<!-- Création de la partie photos apparentées -->
<?php
// Obtient l'URL de la photo associée à l'article
$photo = get_the_post_thumbnail_url(null, "large");

// Obtient le titre de l'article
$photo_titre = get_the_title();

// Obtient l'URL de l'article
$post_url = get_permalink();

// Obtient la référence depuis le champ personnalisé 'référence'
$reference = get_field('référence');

// Obtient les catégories de l'article
$categories = get_the_terms(get_the_ID(), 'categorie');

// Obtient le nom de la première catégorie de l'article
$categorie_name = $categories[0]->name;
?>

<div class="bloc-photo">
    <!-- Affiche l'image de l'article -->
    <img class="blocPhoto" src="<?php echo $photo; ?>" alt="<?php echo $photo_titre; ?>">

    <div class="hoverImg">
        <!-- Affiche la référence de l'article -->
        <h2><?php echo $reference; ?></h2>

        <!-- Affiche le nom de la catégorie de l'article -->
        <h3><?php echo $categorie_name; ?></h3>

        <div>
            <!-- Ajoute un lien vers la page de l'article -->
            <a href="<?php echo get_permalink(); ?>">
                <i class="fa fa-eye hoverEye"></i>
            </a>
        </div>

        <div>
            <!-- Ajoute une icône pour l'expansion de la photo avec des données supplémentaires -->
            <a class="icon" href="#" data-reference="<?php echo $reference; ?>" data-categorie="<?php echo $categorie_name; ?>" data-thumbnail-url="<?php echo $photo; ?>">
                <i class="fa fa-expand iconFullscreen"></i>
            </a>
        </div>
    </div>
</div>

