<?php

/*
=====================================================================
=====================================================================
robots
=====================================================================
=====================================================================
*/

function metaRobotSet(){
	$metaRobotStates = "none";
	// $metaRobotStates = "index, follow";
	if( is_home() || is_front_page() ){
		echo $metaRobotStates;
	}elseif(is_404()){
		echo "none";
	}elseif(is_page("thanks")){
		echo "none";
	}elseif(is_search()){
		echo "none";
	}elseif(is_tax()){
		echo "none";
	}elseif(is_archive()){
		echo $metaRobotStates;
	}elseif(is_page() || is_single()){
		echo $metaRobotStates;
	}
}

/*
=====================================================================
=====================================================================
OGPの設定
=====================================================================
=====================================================================
*/

//OGP画像のURL
function metaOGPSet(){
	$mainOGP = getOGPImage();
	if( is_home() || is_front_page() ){
		echo $mainOGP;
	}elseif(is_single() && get_the_post_thumbnail()){
		echo the_post_thumbnail_url( 'full' );
	}else{
		echo $mainOGP;
	}
}

//Twitter cardの設定
function metaTwitterCard(){
	echo "summary_large_image";
}

/*
=====================================================================
=====================================================================
faviconの設定
=====================================================================
=====================================================================
*/

function metaFavicon(){
	$home_url = get_template_directory_uri();
	echo "{$home_url}/assets/images/meta/favicon.ico";
}
function metaAppletouchIcon(){
	$home_url = get_template_directory_uri();
	echo "{$home_url}/assets/images/meta/apple-touch-icon.png";
}

/*
=====================================================================
=====================================================================
タイトルの設定
=====================================================================
=====================================================================
*/

function metaTitleSet(){
	//サイトタイトル
	$siteTitle = get_bloginfo( 'name' );
	if( is_home() || is_front_page() ){
		echo $siteTitle;
	}elseif(is_404()){
		echo "お探しのページは見つかりませんでした | {$siteTitle}";
	}elseif(is_search()){
		$searchQuery = get_search_query();
		echo "{$searchQuery}の検索結果 | {$siteTitle}";
	}elseif(is_tax()){
		//タクソノミーアーカイブ
		$title = get_queried_object()->name;
		echo "{$title} | {$siteTitle}";
	}elseif(is_archive()){
		//アーカイブ
		$title = get_post_type_object(get_post_type()) ->labels->name;
		echo "{$title} | {$siteTitle}";
	}elseif(is_page() || is_single()){
		//固定・シングル
		$title = get_the_title();
		echo "{$title} | {$siteTitle}";
	}
}

/*
=====================================================================
=====================================================================
ディスクリプションの設定
=====================================================================
=====================================================================
*/

function metaDescriptionSet(){    
	//top
	$siteDescription = get_bloginfo( 'description' );

	if( is_home() || is_front_page() ){
		echo $siteDescription;
	}elseif(is_404()){
		echo "お探しのページは見つかりませんでした。一時的にアクセス出来ない状態か、移動もしくは削除されてしまった可能性があります。";
	}elseif(is_search()){
		//検索結果
		$searchQuery = get_search_query();
		echo "{$searchQuery}の検索結果を表示しています。";
	}elseif(is_tax()){
		//タクソノミーアーカイブ
		$description = get_queried_object()->description;
		if($description == null){
			echo $siteDescription;
		}else{
			echo $description;
		}
	}elseif(is_archive()){
		//カスタム投稿アーカイブ
		$description = get_post_type_object(get_post_type())->description;
		if($description == null){
			echo $siteDescription;
		}else{
			echo $description;
		}
	}elseif(is_page() || is_single()){
		//固定・シングル
		$description = get_post_meta(get_the_ID(), 'meta_description', true);
		if( $description ){;
			echo htmlspecialchars($description);
		}else{
			echo $siteDescription;
		}
	}
}

/*
=====================================================================
=====================================================================
現在のURL取得
=====================================================================
=====================================================================
*/

function nowUrl(){
	$url = '';
	if(isset($_SERVER['HTTPS'])){
		$url .= 'https://';
	}else{
		$url .= 'http://';
	}
	$url .= $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	return $url;
}

?>
<meta format-detection="telephone=no">
<!-- robots -->
<meta name="robots" content="<?php metaRobotSet(); ?>">
<!-- meta -->
<title><?php metaTitleSet(); ?></title>
<meta name="description" content="<?php metaDescriptionSet(); ?>" />
<link rel="canonical" href="<?php echo nowUrl(); ?>">
<meta name="keywords" content="">
<!-- OGP -->
<meta property="og:type" content="website" />
<meta property="og:title" content="<?php metaTitleSet(); ?>" />
<meta property="og:description" content="<?php metaDescriptionSet(); ?>" />
<meta property="og:image" content="<?php echo metaOGPSet(); ?>">
<meta property="og:url" content="<?php echo nowUrl(); ?>" />
<meta property="og:image:secure_url" content="<?php echo metaOGPSet(); ?>" />
<meta property="og:site_name" content="<?php metaDescriptionSet(); ?>" />
<meta property="og:locale" content="ja_JP" />
<!-- twitter card -->
<meta name="twitter:card" content="<?php metaTwitterCard(); ?>" />
<meta name="twitter:title" content="<?php metaTitleSet(); ?>" />
<meta name="twitter:description" content="<?php metaDescriptionSet(); ?>" />
<meta name="twitter:image" content="<?php echo metaOGPSet(); ?>" />
<!-- facebook card -->
<!-- <meta name="facebook-domain-verification" content="" /> -->
<!-- favicon -->
<link rel="icon" href="<?php metaFavicon(); ?>">
<link rel="apple-touch-icon" sizes="72x72" href="<?php metaAppletouchIcon(); ?>">
<!-- hreflang -->
<!-- <link rel="alternate" hreflang="ここに言語コードを記述" href="その言語で書かれたページのURLを記述"> -->
<!-- Google Tag Manager -->
<!-- // Google Tag Manager -->