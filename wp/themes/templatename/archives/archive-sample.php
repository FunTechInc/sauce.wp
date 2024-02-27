<?php get_header(); ?>
<main class="ly_main">
	<div class="pg_sample js_namespace" id="pg_sample" data-barba="container" data-barba-namespace="sample">
		<div class="ly_inner">
			<div class="sampleView">
				<h1 class="ff_eng js_fadeInUp">Sample Archive</h1>
				<img class="js_fadeInUp" src="<?php echo get_template_directory_uri(); ?>/assets/images/dummy/vanilla.png" alt="" width="" height="" loading="lazy" />
				<h3 class="js_fadeInUp">hogehoge hogehoge hoge hogehgoe</h3>
				<?php if ( have_posts() ) : ?>
				<?php while( have_posts() ) : the_post(); ?>
				<a class="js_fadeInUp link" href="<?php the_permalink(); ?>">シングルページへのリンク：<?php the_title(); ?></a>
				<?php endwhile; ?>
				<?php endif; ?>
				<?php 
				$taxonomy_terms = get_terms('sample_category');
				if(!empty($taxonomy_terms)&&!is_wp_error($taxonomy_terms)){foreach($taxonomy_terms as $taxonomy_term):?>
				<a class="js_fadeInUp link" href="<?php echo get_term_link($taxonomy_term);?>">タクソノミーアーカイブへのリンク：<?php echo $taxonomy_term->name; ?></a>
				<?php endforeach;}?>
			</div>
		</div>
	</div>
</main>
<?php get_footer(); ?>