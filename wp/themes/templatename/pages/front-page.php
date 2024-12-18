<?php
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
   exit;
}
get_header();
?>
<main class="ly_main">
	<div class="pg_top js_namespace" id="pg_top" data-barba="container" data-barba-namespace="top">
		<div class="ly_inner">
			<div class="sampleView">
				<h1 class="ff_eng js_fadeInUp">Welcome to</h1>
				<img class="js_fadeInUp" src="<?php echo get_template_directory_uri(); ?>/assets/images/dummy/vanilla.png" alt="" width="" height="" loading="lazy">
				<h3 class="js_fadeInUp">Get started by editing index.php！</h3>
			</div>
		</div>
	</div>
</main>
<?php get_footer(); ?>