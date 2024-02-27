<?php
/**
 * カスタム投稿タイプに関連する設定群
 */


/*
=====================================================================
=====================================================================
カスタム投稿タイプ設定
=====================================================================
=====================================================================
*/

function registerPostandTaxonomy() {
	$support = array(
		'title',
		'custom-fields',
		'thumbnail',
		'editor',
		'page-attributes',
	);

	register_post_type(
		'sample',
		array(
			'label' => 'サンプル',
			'description' => 'サンプル',
			'public' => true,
      // 個別ページを生成しない場合は以下を追加
      //'public' => false,
      //'show_ui' => true,
			'supports' => $support,
			'has_archive' => true,
			'menu_position' =>4,
			'show_in_rest' => true,
	));

	//カスタムタクソノミーのアーカイブのURLの構造を変更する場合
	register_taxonomy(
        'sample_category',
        'sample',
        array(
			'labels' => array(
			'name' => 'サンプルカテゴリ',
			'add_new_item' => 'サンプルカテゴリを追加',
			'edit_item' => 'サンプルカテゴリの編集',
        ),
        'hierarchical' => true,
        'show_admin_column' => true,
        'rewrite' => array('with_front' => false,'hierarchical' => true,'slug' => 'sample/category'),
        'show_ui' => true,
        'show_in_rest' => true,
        )
	);
}
add_action('init','registerPostandTaxonomy');

//カスタムタクソノミーのアーカイブのURLの構造を変更する場合
add_rewrite_rule('sample/category/([^/]+)/?$', 'index.php?sample_category=$matches[1]', 'top');

//カスタム投稿のパーマリンクをIDにする
function custom_post_type_link( $link, $post ){
	if ( $post->post_type === 'hogehoge' ) {
		return home_url( '/hogehoge/' . $post->ID );
	} else if ( $post->post_type === 'poyopoyo' ) {
		return home_url( '/poyopoyo/' . $post->ID );
	} else {
		return $link;
	}
}
add_filter( 'post_type_link', 'custom_post_type_link', 1, 2 );

function custom_rewrite_rules_array( $rules ) {
	$new_rewrite_rules = array( 
		'hogehoge/([0-9]+)/?$' => 'index.php?post_type=hogehoge&p=$matches[1]',
		'poyopoyo/([0-9]+)/?$' => 'index.php?post_type=poyopoyo&p=$matches[1]',
	);
	return $new_rewrite_rules + $rules;
}
add_filter( 'rewrite_rules_array', 'custom_rewrite_rules_array' );

/*
=====================================================================
=====================================================================
カスタムタクソノミーをラジオボタンにする
=====================================================================
=====================================================================
*/
add_action( 'admin_print_footer_scripts', 'select_to_radio_taxonomy' );
function select_to_radio_taxonomy() {
    ?>
<script type="text/javascript">
jQuery(function($) {
	// 投稿画面
	$('#taxonomy-facility_area input[type=checkbox]').each(function() {
		$(this).replaceWith($(this).clone().attr('type', 'radio'));
	});
	// 一覧画面
	var facility_area_checklist = $('.facility_area-checklist input[type=checkbox]');
	facility_area_checklist.click(function() {
		$(this).closest('.facility_area-checklist').find(' input[type=checkbox]').not(this).prop('checked', false);
	});
});
</script>
<?php
}