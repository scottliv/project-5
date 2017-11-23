<?php
/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php $args = array( 'post_type' => 'post', 'posts_per_page' => -1 ); $query = new WP_Query( $args );?>		

			<?php while ( $query->have_posts() ) : $query->the_post(); ?>

				<?php get_template_part( 'template-parts/content', 'archive' ); ?>

			<?php endwhile; // End of the loop. ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
