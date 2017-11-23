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
      <?php if (is_user_logged_in() && current_user_can( 'edit_posts' ) ): ?>

       <form name="quote-form" id="quote-submission-form">

        <label for="author">Author of Quote</label>
        <input type="text" id="title" placeholder="Author">

        <label for="quote-content">Quote</label>
        <textarea id="quote" placeholder="Quote"></textarea>

         <label for="quote-source">Quote Source</label>
         <input type="text" id="source">

         <label for="quote-source-url">Source Url</label>
         <input type="url" id="source-url">

         <input type="submit" id="submit-quote">

       </form>

       <button class="hidden" id="submit-another">Submit Another</button>

      <?php else:?>
        <p>You must be logged in to submit a quote</p>
        <p><?php echo sprintf( '<a href="%1s">%2s</a>', esc_url( wp_login_url() ), 'Click here to log in' );?></p>
      <?php endif;?>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
