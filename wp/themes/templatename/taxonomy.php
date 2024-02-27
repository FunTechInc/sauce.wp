<?php
//タクソノミーアーカイブ
$taxonomy = get_queried_object()->taxonomy;
get_template_part('taxonomies/taxonomy', $taxonomy);