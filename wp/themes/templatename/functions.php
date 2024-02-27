<?php

if ( ! defined( 'ABSPATH' ) )
	exit;  


$isDebug = defined('WP_DEBUG') && WP_DEBUG;

// ローカルで開発する場合: true, 本番で開発する場合
define('IS_VITE_DEVELOPMENT', $isDebug);


include "inc/inc.vite.php";


$get_template_directroy = get_template_directory();
require_once $get_template_directroy . '/config/functions.php';
require_once $get_template_directroy . '/config/general.php';
require_once $get_template_directroy . '/config/posttype.php';
require_once $get_template_directroy . '/config/mainquery.php';
require_once $get_template_directroy . '/config/search.php';
require_once $get_template_directroy . '/config/meta.php';
require_once $get_template_directroy . '/config/plugin.php';

require_once $get_template_directroy . '/config/initialize-setup.php';