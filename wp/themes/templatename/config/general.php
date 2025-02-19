<?php
/**
 * WordPress全体に関わる設定群
 */

/*
=====================================================================
=====================================================================
通知設定
=====================================================================
=====================================================================
*/

// Disable auto-update emails.
add_filter( 'auto_core_update_send_email', '__return_false' );

// Disable auto-update emails for plugins.
add_filter( 'auto_plugin_update_send_email', '__return_false' );

// Disable auto-update emails for themes.
add_filter( 'auto_theme_update_send_email', '__return_false' );

/*
=====================================================================
=====================================================================
common
=====================================================================
=====================================================================
*/

// wp_headの余白をなくす
add_filter( 'show_admin_bar', '__return_false' );

// WordPressのauthor情報を非表示にする
function author_archive_redirect() {
	if( is_author() ) {
		wp_redirect( home_url());
		exit;
   }
}
add_action( 'template_redirect', 'author_archive_redirect' );

/*
=====================================================================
=====================================================================
不要な設定を削除
=====================================================================
=====================================================================
*/
//不要なコードを読み込ませない
add_action('wp_enqueue_scripts', function() {
	if (!is_admin()) {
		wp_deregister_style('wp-block-library');
		wp_dequeue_style( 'classic-theme-styles' );
		wp_deregister_script('jquery');
		wp_dequeue_style('global-styles');
	}
});

// WordPressバージョン出力metaタグ非表示
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');

// RSSフィード無効化
remove_action('do_feed_rdf', 'do_feed_rdf');
remove_action('do_feed_rss', 'do_feed_rss');
remove_action('do_feed_rss2', 'do_feed_rss2');
remove_action('do_feed_atom', 'do_feed_atom');

// コメントを廃止
add_filter( 'comments_open', '__return_false');
add_action( 'admin_menu', 'removeComment' );
function removeComment(){
		remove_menu_page( 'edit-comments.php' );
}

// バージョンを隠す
function remove_version() {
		return '';
}
add_filter('the_generator', 'removeVersion');

function removeCssjsVer2( $src ) {
		if ( strpos( $src, 'ver=' ) )
			$src = remove_query_arg( 'ver', $src );
		return $src;
}
add_filter( 'style_loader_src', 'removeCssjsVer2', 9999 );
add_filter( 'script_loader_src', 'removeCssjsVer2', 9999 );

// 絵文字機能の削除
function disableEmoji() {
		remove_action('wp_head', 'print_emoji_detection_script', 7);
		remove_action('admin_print_scripts', 'print_emoji_detection_script');
		remove_action('wp_print_styles', 'print_emoji_styles');
		remove_action('admin_print_styles', 'print_emoji_styles');
		remove_filter('the_content_feed', 'wp_staticize_emoji');
		remove_filter('comment_text_rss', 'wp_staticize_emoji');
		remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
}
add_action('init', 'disableEmoji');


/*
=====================================================================
=====================================================================
投稿
=====================================================================
=====================================================================
*/

//srcset属性の削除
add_filter( 'wp_calculate_image_srcset_meta', '__return_null' );

// 投稿のimgからpタグを削除
function removePonImages($content){
	return preg_replace('/<p>(\s*)(<img .* \/>)(\s*)<\/p>/iU', '\2', $content);
}
add_filter('the_content', 'removePonImages');

//投稿を管理画面から削除
add_action( 'admin_menu', 'removePost' );
function removePost(){
	remove_menu_page( 'edit.php' );
}


/*
=====================================================================
=====================================================================
同じ日付でも日付を表示
=====================================================================
=====================================================================
*/

function postDate() {
	global $previousday;
	$previousday = '';
}
add_action( 'the_post', 'postDate' );

/*
=====================================================================
=====================================================================
サムネイル
=====================================================================
=====================================================================
*/
add_theme_support('post-thumbnails');
function defaultThumbnail( $post_id ) {
		$postThumbnail = get_post_meta( $post_id, $key = '_thumbnail_id', $single = true );
		$defaultThumbnail_id = '32';
		if ( !wp_is_post_revision( $post_id ) ) {
			if ( empty( $postThumbnail ) ) {
					update_post_meta( $post_id, $meta_key = '_thumbnail_id', $meta_value = $defaultThumbnail_id );
			}
		}
}
add_action( 'save_post', 'defaultThumbnail' );


/*
=====================================================================
=====================================================================
固定ページの名前変更
=====================================================================
=====================================================================
*/
function changePostLabel( $labels ) {
	foreach ( $labels as $key => $value ) {
		$labels->$key = str_replace( '固定ページ', 'その他固定ページ', $value );
	}

	return $labels;
}


/*
=====================================================================
=====================================================================
xmlrpc.phpの無効化
=====================================================================
=====================================================================
*/
add_filter( 'post_type_labels_page', 'changePostLabel' );