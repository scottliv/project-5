<?php
/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main archives" role="main">
			<h1 class="entry-title">Archives</h1>
			<h2 class="archive-title">Quote Authors</h2>
			<?php $args = array( 'post_type' => 'post', 'posts_per_page' => -1 ); $query = new WP_Query( $args );?>		

			<?php while ( $query->have_posts() ) : $query->the_post(); ?>

				<?php
					echo sprintf('<a href="%1s">%2s</a>', esc_url(get_permalink()), get_the_title());
				?>

			<?php endwhile; // End of the loop. ?>

			<?php $categories = get_categories();	?>

			<div class="post_categories">
				<h2 class="archive-title">Categories</h2>
				<?php
				foreach ( $categories as $category ):
						$category_link = get_category_link( $category->term_id );
				?>
					<a href="<?php echo $category_link ?>" title="<?php echo $category->name ?> Category"> <?php echo $category->name ?> </a>
				
				<?php endforeach; ?>
			</div>
				
			<?php $tags = get_tags();	?>
			<div class="post_tags">
				<h2 class="archive-title">Tags</h2>
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
