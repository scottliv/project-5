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

				<?php
					echo sprintf('<a href="%1s">%2s</a>', esc_url(get_permalink()), get_the_title());
				?>

			<?php endwhile; // End of the loop. ?>

			<?php wp_list_categories(); ?>

<?php
	$tags = get_tags();
?>

<div class="post_tags">
<?php
foreach ( $tags as $tag ):
		$tag_link = get_tag_link( $tag->term_id );
?>
	<a href="<?php echo $tag_link ?>" title="<?php echo $tag->name ?> Tag"> <?php echo $tag->name ?> </a>

<?php endforeach; ?>
</div>


		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
