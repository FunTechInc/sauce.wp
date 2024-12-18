<?php
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
   exit;
}
get_template_part('pages/page', get_post( get_the_ID() )->post_name);