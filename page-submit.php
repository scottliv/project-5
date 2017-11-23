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
      <?php if (is_user_logged_in() ): ?>
       <form action="submit">
         <input type="text" id="title" placeholder="Author">
         <input type="textarea" id="quote" placeholder="Quote">
         <input type="text" id="source">
         <input type="text" id="source-url">
         <input type="submit" id="submit-quote">
       </form>
       <button class="hidden" id="submit-another">Submit Another</button>
      <?php else:?>
        <p>You must be logged in to submit a quote</p>
      <?php endif;?>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
