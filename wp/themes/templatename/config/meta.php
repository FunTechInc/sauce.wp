<?php
/**
 * メタに関する設定群
 */


/*
=====================================================================
=====================================================================
meta 
=====================================================================
=====================================================================
*/

// カスタムフィールド追加
add_action('admin_menu', 'metaAddCustomFields');
add_action('save_post', 'metaSaveCustomFields');
function metaAddCustomFields() {
	add_meta_box( 'meta_f02', 'メタディスクリプション', 'metaDescription', 'post');
	add_meta_box( 'meta_f02', 'メタディスクリプション', 'metaDescription', 'page');
	//カスタム投稿にも追加する時は以下
	add_meta_box( 'meta_f02', 'メタディスクリプション', 'metaDescription', 'sample');
}

// カスタムフィールドの入力欄表示
function metaDescription() {
	global $post;
	$f_data = get_post_meta($post->ID,'meta_description',true);
	wp_nonce_field( wp_create_nonce( __FILE__ ), 'ul_nonce' );
	echo '<p>メタディスクリプションを入力してください。</p>';
	echo '<textarea style="width:100%" rows="4" type="text" name="meta_description">'.htmlspecialchars($f_data).'</textarea>';
}

// カスタムフィールドの値を保存
function metaSaveCustomFields( $post_id ) {

	//nonceによるセキュリティ対策
	$ul_nonce = isset( $_POST['ul_nonce'] ) ? $_POST['ul_nonce'] : null;
	if ( !wp_verify_nonce( $ul_nonce, wp_create_nonce( __FILE__ ) ) ) {
			return $post_id;
	}
	
  //例外処理
	if( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) { 
		return $post_id;
	}
	if ( !current_user_can( 'edit_post', $post_id ) ) {
		return $post_id;
	}
	
  //カスタムフィールドのキー一覧
	$keys = array(
		'meta_description',
	);
	
  //カスタムフィールドの更新
	foreach( $keys as $key ){
		$data = $_POST[$key];
		if ( get_post_meta( $post_id, $key ) == "" ) {
			add_post_meta( $post_id, $key, $data, true );
		} elseif ( $data != get_post_meta( $post_id, $key, true ) ) {
			update_post_meta( $post_id, $key, $data );
		} elseif ( $data == "" ) {
			delete_post_meta( $post_id, $key, get_post_meta( $post_id, $key, true ) );
		}
	}
}