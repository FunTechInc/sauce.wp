<?php 

/*
=====================================================================
=====================================================================
フリーワード検索
=====================================================================
=====================================================================
*/
function SearchFilter($query) {
	if ($query->is_search) {
		$query->set('post_type', array ('page','news','column','facility','conference'));
	}
	return $query;
}
add_filter('pre_get_posts','SearchFilter');

//検索キーワードに必ず何か入れないと検索結果ページが表示されないのを解除
function custom_search($search, $wp_query  ) {
    //query['s']があったら検索ページ表示
		if ( isset($wp_query->query['s']) ) $wp_query->is_search = true;
		return $search;
}
add_filter('posts_search','custom_search', 10, 2);