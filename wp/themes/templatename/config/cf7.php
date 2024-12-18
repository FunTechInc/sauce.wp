<?php
/**
 * Contact Form 7の設定
 */

/*
=====================================================================
=====================================================================
CF7 サンクスページへの遷移
=====================================================================
=====================================================================
*/
add_action( 'wp_footer', 'add_thanks_page' );
function add_thanks_page() {
    $homeUrl = home_url();
    echo <<< EOC
    <script>
        var thanksPage = {
            8358: '{$homeUrl}/contact/thanks/',
        };
        document.addEventListener( 'wpcf7mailsent', function( event ) {
            location = thanksPage[event.detail.contactFormId];
        }, false );
    </script>
    EOC;
}

// Contact Form 7で自動挿入されるpタグとbrタグを削除する
add_filter('wpcf7_autop_or_not', 'wpcf7_autop_return_false');
function wpcf7_autop_return_false() {
    return false;
}