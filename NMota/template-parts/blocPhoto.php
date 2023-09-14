<!-- Création de la partie photos apparentées -->
<?php
$photo = get_the_post_thumbnail_url(null, "large");
$photo_titre = get_the_title();
$post_url = get_permalink();
$reference = get_field('référence');
$categories = get_the_terms(get_the_ID(), 'categorie');
$categorie_name = $categories[0]->name;
?>

<div class="bloc-photo">
    <img class="blocPhoto" src="<?php echo $photo; ?>" alt="<?php echo $photo_titre; ?>">
    <div class="hoverImg">
        <h2><?php echo $reference; ?></h2>
        <h3><?php echo $categorie_name; ?></h3>
        <div>
            <a href="<?php echo get_permalink(); ?>">
                <i class="fa fa-eye hoverEye"></i>
            </a>
        </div>
        <div>
            <a class="icon" href="#" data-reference="<?php echo $reference; ?>" data-categorie="<?php echo $categorie_name; ?>" data-thumbnail-url="<?php echo $photo; ?>">
                <i class="fa fa-expand iconFullscreen"></i>
            </a>
        </div>
    </div>
</div>
