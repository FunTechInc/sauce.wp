<div class="bl_breadcrumb">
      <div class="ly_inner">
         <ul>
            <li><a href="<?php echo home_url( '/' ); ?>">トップページ</a></li>
            <?php if(is_page("hoge")):?>
               <li><a href="<?php echo home_url( '/' ); ?>hoge"><?php the_title(); ?></a></li>
            <?php elseif(is_tree("123")): ?>
               <li><a href="<?php echo home_url( '/' ); ?>hogehoge">hogehoge</a></li>
               <li><a><?php the_title(); ?></a></li>
            <?php elseif(is_archive(array('poyo','piyo'))): ?>
               <li><a><?php echo esc_html(get_post_type_object(get_post_type())->label); ?></a></li>
            <?php elseif(is_singular("fuga")): ?>
               <li><a href="<?php echo home_url( '/' ); ?>fuga">fuga</a></li>
               <li><a><?php the_title(); ?></a></li>
            <?php elseif(is_singular("poyo")): ?>
               <li><a href="<?php echo home_url( '/' ); ?>poyo">poyo</a></li>
               <?php $parent_id = $post->post_parent; if($parent_id): ?>
                  <li><a href="<?php echo get_permalink($parent_id); ?>"><?php echo get_post($parent_id)->post_title; ?></a></li>
               <?php endif; ?> 
               <li><a><?php the_title(); ?></a></li>   
            <?php elseif(is_404()): ?>
               <li><a>お探しのページは見つかりませんでした。</a></li>
            <?php elseif(is_search()): ?>
               <li><a href="<?php echo home_url( '/' ); ?>search">フリーワード検索</a></li>
               <li><a>「<?php the_search_query(); ?>」 の検索結果</a></li>     
            <?php elseif(is_page() || is_single() || is_archive() ): ?>
               <li><a><?php the_title(); ?></a></li>
            <?php endif; ?> 
         </ul>
      </div>
</div>