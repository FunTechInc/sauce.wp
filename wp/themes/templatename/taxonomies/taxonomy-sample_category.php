<?php
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
   exit;
}
get_header();
?>
<main class="ly_main">
	<div class="pg_sample js_namespace" id="pg_sample" data-barba="container" data-barba-namespace="sample">
		<div class="ly_inner">
			<div class="sampleView">
				<h1 class="ff_eng js_fadeInUp">Sample Taxo Archive</h1>
				<img class="js_fadeInUp" src="<?php echo get_template_directory_uri(); ?>/assets/images/dummy/vanilla.png" alt="" width="" height="" loading="lazy">
				<h3 class="js_fadeInUp">hogehoge hogehoge hoge hogehgoe</h3>
				<?php if ( have_posts() ) : ?>
				<?php while( have_posts() ) : the_post(); ?>
				<a class="js_fadeInUp link" href="<?php the_permalink(); ?>">シングルページへのリンク：<?php the_title(); ?></a>
				<?php endwhile; ?>
				<?php endif; ?>
			</div>
		</div>
	</div>
</main>
<?php get_footer(); ?>