<?php
/**
 * プラグインの設定群
 */


/**
 * 指定されたプラグインのリストが有効化されているかチェックし、
 * 有効化されていない場合はエラーログを出す
 */

function check_plugins_active() {
    include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

    $plugins_to_check = array(
        array(
            'path' => 'siteguard/siteguard.php',
            'name' => 'SiteGuard WP Plugin'
        ),
        array(
            'path' => 'user-login-history/user-login-history.php',
            'name' => 'User Login History'            
        ),        
    );

    foreach ($plugins_to_check as $plugin) {
        if ( !file_exists(WP_PLUGIN_DIR.'/'.$plugin['path']) ) {
            add_action('admin_notices', function() use ($plugin) {
                plugin_not_downloaded_notice($plugin['name']);
            });
        } elseif ( !is_plugin_active($plugin['path']) ) {
            add_action('admin_notices', function() use ($plugin) {
                plugin_error_notice($plugin['name']);
            });
        }
    }
}

function plugin_error_notice($plugin_name) {
    ?>
    <div class="error notice">
        <p><?php echo sprintf(__('「%s」プラグインが有効化されていません。セキュリティ対策のためこのプラグインを有効化してください。', 'text-domain'), $plugin_name); ?></p>
    </div>
    <?php
}

function plugin_not_downloaded_notice($plugin_name) {
    ?>
    <div class="error notice">
        <p><?php echo sprintf(__('「%s」プラグインがダウンロードされていません。セキュリティのためにこのプラグインをインストール・有効化してください。', 'text-domain'), $plugin_name); ?></p>        
    </div>
    <?php
}

add_action( 'admin_init', 'check_plugins_active' );
