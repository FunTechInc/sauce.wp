<?php
/**
 * 初期設定に関する関数群
 */

/*
=====================================================================
=====================================================================
初期設定: 固定ページ作成
=====================================================================
=====================================================================
*/

function create_pages_and_setting() {
    $pages_array = [
        ['title'=>'ABOUT', 'name'=>'about', 'parent'=>''],
    ];

    foreach ($pages_array as $value) {
        setting_pages($value);
    }
}

function setting_pages( $val ) {
    //親ページ判別
    if(!empty($val['parent'])){
        $parent_id = get_page_by_path($val['parent']);
        $parent_id = $parent_id->ID;
        $page_slug = $val['parent'] . "/" . $val['name'];
    }else{
        $parent_id = "";
        $page_slug =$val['name'];
    }
    if ( empty(get_page_by_path( $page_slug ))) {
        //固定ページがなければ作成
        $insert_id = wp_insert_post(
            array(
                'post_title'   => $val['title'],
                'post_name'    => $val['name'],
                'post_status'  => 'publish',
                'post_type'    => 'page',
                'post_parent'  => $parent_id,
                'post_content' => '',
            )
        );
    }else{
        //固定ページがすでにあれば更新
        $page_obj = get_page_by_path( $page_slug );
        $page_id = $page_obj->ID;
        $base_post = array(
            'ID'           => $page_id,
            'post_title'   => $val['title'],
            'post_name'    => $val['name'],
        );
        wp_update_post( $base_post );
    }
}

// 一度生成したら、これは呼び出さないようにする
// add_action('after_setup_theme', 'create_pages_and_setting');