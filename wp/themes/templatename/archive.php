<?php
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
   exit;
}
get_template_part('archives/archive', get_post_type());