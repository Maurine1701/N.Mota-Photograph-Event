<footer class="footer">
    <div class="menu-footer">
        <?php
            // Affiche le menu créé dans l'administration de WordPress
            wp_nav_menu(array(
                'theme_location' => 'footer', 
                'container' => false, 
                'menu_class' => 'menu-footer',
            ));
            ?>
        <p>TOUT DROITS RÉSERVÉS</p>
    </div>
</footer>

<?php get_template_part('template-parts/modaleContact'); ?>
<?php get_template_part('template-parts/lightbox'); ?>

<?php wp_footer(); ?>

</body>
</html>
