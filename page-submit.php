<?php
/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'template-parts/content', 'page' ); ?>

			<?php endwhile; // End of the loop. ?>

      <form action="submit">
        <input type="text" id="title">
        <input type="textarea" id="content">
        <input type="text" id="source">
        <input type="text" id="source-url">
        <input type="submit" id="submit-quote">
      </form>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
