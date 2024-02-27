<?php 
/**
 * 汎用関数の定義
 */

/*===============================================
OGP取得
===============================================*/
function getOGPImage(){
    $path = get_template_directory_uri();
    $ogp = "{$path}/assets/images/meta/ogp.jpg";
    return $ogp;
};


/*
=====================================================================
=====================================================================
is_mobileがtureの時はスマホ、falseの時はタブレットとPC
=====================================================================
=====================================================================
*/
function is_mobile() {
    $useragents = array(
    'iPhone',          // iPhone
    'iPod',            // iPod touch
    '^(?=.*Android)(?=.*Mobile)', // 1.5+ Android
    'dream',           // Pre 1.5 Android
    'CUPCAKE',         // 1.5+ Android
    'blackberry9500',  // Storm
    'blackberry9530',  // Storm
    'blackberry9520',  // Storm v2
    'blackberry9550',  // Storm v2
    'blackberry9800',  // Torch
    'webOS',           // Palm Pre Experimental
    'incognito',       // Other iPhone browser
    'webmate'          // Other iPhone browser
    );
    $pattern = '/'.implode('|', $useragents).'/i';
    return preg_match($pattern, $_SERVER['HTTP_USER_AGENT']);
}


/*
=====================================================================
=====================================================================
子ページ判定
=====================================================================
=====================================================================
*/
function is_subpage() {
    global $post;

    if (is_page() && $post->post_parent) {
        return $post->post_parent;
    } else {
        return false;
    }
}
function is_tree( $pid ) {
    global $post;     

    if ( is_page( $pid ) )
        return true;

    $anc = get_post_ancestors( $post->ID );
    foreach ( $anc as $ancestor ) {
        if( is_page() && $ancestor == $pid ) {
                return true;
        }
    }

    return false;
}
