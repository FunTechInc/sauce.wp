<header class="bl_header" id="js_header">
	<div class="bl_header_inner">
		<h1 class="bl_headerLogo">
			<a href="<?php echo home_url('/'); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/dummy/vanilla.png" alt="title" loading="lazy" /></a>
		</h1>
		<div class="bl_headerNav_wrapper">
			<nav class="bl_headerNav">
				<ul class="bl_headerNav_list_wrapper">
					<li class="bl_headerNav_list js_subNavBtnPrevent"><a class="bl_headerNav_btn" href="<?php echo home_url('/'); ?>" title="">top</a></li>
					<li class="bl_headerNav_list js_subNavBtnPrevent"><a class="bl_headerNav_btn" href="<?php echo home_url('/'); ?>dummy" title="">dummy</a></li>
					<li class="bl_headerNav_list js_subNavBtnPrevent"><a class="bl_headerNav_btn" href="<?php echo home_url('/'); ?>formdemo" title="">form demo</a></li>
					<li class="bl_headerNav_list bl_subMenu_parent js_subNavBtn">
						<a class="bl_headerNav_btn" href="<?php echo home_url('/'); ?>sample" title="">subMenu ↓</a>
						<div class="bl_subMenu_child js_subNavPanel">
							<a href="#" class="bl_subMenu_list">menu</a>
							<a href="#" class="bl_subMenu_list">menu</a>
						</div>
					</li>
				</ul>
			</nav>
			<button class="bl_hamburgerBtn" type="button" aria-controls="js_headerNav_sm" aria-expanded="false" id="js_hamburgerBtn">
				<div class="bl_hamburgerBtn_trigger">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 23 12" preserveAspectRatio="none" style="enable-background: new 0 0 23 12" xml:space="preserve">
						<path class="btn" d="M22 2H1c-.6 0-1-.4-1-1s.4-1 1-1h21c.6 0 1 .4 1 1s-.4 1-1 1zM22 7H1c-.6 0-1-.4-1-1s.4-1 1-1h21c.6 0 1 .4 1 1s-.4 1-1 1zM22 12H1c-.6 0-1-.4-1-1s.4-1 1-1h21c.6 0 1 .4 1 1s-.4 1-1 1z" />
					</svg>
				</div>
			</button>
		</div>
	</div>
	<nav class="js_scrollContWrap bl_headerNav_sm" id="js_headerNav_sm" aria-hidden="true">
		<div class="js_scrollContInner bl_headerNav_sm_inner" id="js_headerNav_sm_inner">
			<ul class="bl_headerNav_sm_listWrapper">
				<li class="bl_headerNav_sm_list">
					<a class="bl_headerNav_sm_btn" href="<?php echo home_url('/'); ?>" title=""><span>top</span></a>
				</li>
				<li class="bl_headerNav_sm_list">
					<a class="bl_headerNav_sm_btn" href="<?php echo home_url('/'); ?>dummy" title=""><span>dummy</span></a>
				</li>
				<li class="bl_headerNav_sm_list">
					<a class="bl_headerNav_sm_btn" href="<?php echo home_url('/'); ?>sample" title=""><span>sample</span></a>
				</li>
			</ul>
			<!--focus trap-->
			<div id="js_focusTrap" tabindex="0" style="opacity: 0; width: 0; height: 0"></div>
		</div>
	</nav>
	<div class="bl_headerNav_sm_bg" id="js_smMenuBg">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" style="enable-background: new 0 0 1000 1000" xml:space="preserve" preserveAspectRatio="none">
			<path class="bg_mask" d="M0,0 L1000,0 L1000,0 L0,0 L0,0 Z" />
		</svg>
	</div>
</header>