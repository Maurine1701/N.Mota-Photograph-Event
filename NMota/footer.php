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

<?php wp_footer(); ?>

</body>
</html>
