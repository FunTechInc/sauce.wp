<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover" />
	<?php include("meta.php"); ?>
	<?php // テーマカラー変更（safariのノッチ部分の背景色に対応） ?>
	<meta name="theme-color" content="" />
			
	<?php if(defined('IS_VITE_DEVELOPMENT') && IS_VITE_DEVELOPMENT):?>
		<?php 
			/*
					<?php 
						$ipAddress = "192.168.100.37";
					?>
			<link rel="stylesheet" href='<?php echo "http://{$ipAddress}:8888/wp-content/themes/wp-theme/assets/main-5e575c77.css" ?>'>
			<script type="module" crossorigin src='<?php echo "http://{$ipAddress}:8888/wp-content/themes/wp-theme/assets/main-e78ff657.js" ?>'></script>
			*/
		?>
	<?php else: ?>
		<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/main-69216a6f.css">
		<script type="module" crossorigin src="<?php echo get_template_directory_uri(); ?>/assets/main-b93edd15.js"></script>		
	<?php endif; ?>
	<?php wp_head(); ?>
</head>