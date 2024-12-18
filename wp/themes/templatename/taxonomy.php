<?php
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
   exit;
}
//タクソノミーアーカイブ
$taxonomy = get_queried_object()->taxonomy;
get_template_part('taxonomies/taxonomy', $taxonomy);