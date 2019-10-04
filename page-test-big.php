<?php
/*
Template Name: Histology Page
*/
?>

<?php get_header(); ?>
			
			<div id="content" class="clearfix row">
			
				<div id="main" class="col col-12 clearfix center" role="main" >
					<?php  echo '<button class="eyeball" id="quizzer">Hide</button>';?>		
					<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
					
					<article id="post-<?php the_ID(); ?>" <?php post_class('clearfix'); ?> role="article">
												
						<header>
							
						<?php echo custom_breadcrumbs(); ?> 
							
						</header> <!-- end article header -->
						<section class="post-content row" aria-labelledby="the_slide_title">
							<div class="hist-slides">
								<div class="subcontent col-md-9">
									<?php if ( have_rows('histo_slide') ) : ?>	
									<!--regular post content-->	
										<div id="subcontent-0" class="subcontent-0 subslide active"  <?php get_post_background_img ($post)?>>
											<img src="<?php echo get_stylesheet_directory_uri()."/imgs/trans.png"; ?>" alt="This is blank.">
											<h1 id="the_slide_title" class="slide-title"><?php echo main_slide_title(get_the_ID()); ?></h1>
											<div id="the_slide_content"><?php the_content(); ?></div>
										</div>
									<?php else :?>
										<div class="subcontent-0 active" id="sub-con">
											<?php the_content(); ?>
										</div>
									<?php endif ?>
								
<!--SLIDES BEGIN aka custom fields data-->
									<?php 						
									   if( have_rows('histo_slide') ): 
										$count = 0;
									    $menu = ['Initial Image']; 
									?>
									
									<?php while( have_rows('histo_slide') ): the_row(); 
										// vars								
										$image = get_sub_field('slide_url');
										$content = get_sub_field('slide_text');
										$title = get_sub_field('slide_title');
										//$contentTrue = subTrue('slide_text');
										$count = $count+1;
										if ($title != ' ' && strlen($title) != 0){
											array_push($menu,$title);
										}
									?>
									<div id="subcontent-<?php echo $count;?>" class="subcontent-<?php echo $count;?> subslide" <?php get_post_background_img ($post)?>>
										<img id="overlay-<?php echo $count ;?>" src="<?php echo $image['url']; ?>" alt="<?php echo $title . ' ' . $content;?>">
										<?php if( $title ): ?>											
											<h3 class="slide-title sub-deep">
												<?php echo $title; ?>
											</h3>
										<?php else: ?>
											<!--slide title-->
											<h3 class="slide-title">												
											</h3>
										<?php endif; ?>		
										<?php if( $content ): ?>
									    	<span class="sub-deep"><?php echo $content;?></span>
									    <?php else: ?>
											<div class="slide-text"></div>
										<?php endif;?>
									</div>
									<?php endwhile; ?>	
								</div>
<!--SLIDE NAVIGATION MENU-->
							<div class="button-wrap col-md-3">
								 <?php  
								 $length = count($menu);
								 $i = 0;
								$current_slug = add_query_arg( array(), $wp->request );
								 while ( $i < $length){
								 	if ($i === 0){
								 		//no # for first one
									 	echo '<a href="javascript:;" class="button" id="slide-button-'.$i.'" data-id="'.$i.'">Main Slide</a>';
									 } else {
									 	echo '<a href="javascript:;" class="button" id="slide-button-'.$i.'" data-id="'.$i.'">' .$menu[$i] . '</a>';
									 }
								 	$i++;
								 }

								 ?>
							</div>
<!--END SLIDE MENU-->
						</div>
						
						<?php endif; ?>		
						<!--SUB PAGES MENU-->
						<?php if( have_rows('histo_slide')) {
									 getPrevNext(); 
							} else {								
								echo '<ul>';
								make_nav_list();
								echo '</ul>';
						} ?>										

					</section> <!-- end article section -->
						
					<footer>
							<p class="clearfix"><?php the_tags('<span class="tags">' . __("Tags","wpbootstrap") . ': ', ', ', '</span>'); ?></p>

					</footer> <!-- end article footer -->
					
				</article> <!-- end article -->
					
					<?php comments_template(); ?>
					
					<?php endwhile; ?>	
					
					<?php else : ?>
					
					<article id="post-not-found">
					    <header>
					    	<h1><?php _e("Not Found", "wpbootstrap"); ?></h1>
					    </header>
					    <section class="post-content">
					    	<p><?php _e("Sorry, but the requested resource was not found on this site.", "wpbootstrap"); ?></p>
					    </section>
					    <footer>
					    <?php -e("fish", "wpbootstrap"); ?>
					    </footer>
					</article>

					<?php endif; ?>
			
				</div> <!-- end #main -->
    
				<?php //get_sidebar(); // sidebar 1 ?>
    
			</div> <!-- end #content -->

<?php get_footer(); ?>