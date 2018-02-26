<?php
/*
Template Name: Big Page
*/
?>

<?php get_header(); ?>
			
			<div id="content" class="clearfix row">
			
				<div id="main" class="col col-lg-12 clearfix center" role="main" >

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
										<div class="subcontent-1 subslide active"  <?php get_post_background_img ($post)?>>
											<img src="<?php echo get_stylesheet_directory_uri()."/imgs/trans.png"; ?>" alt="This is blank.">
											<h1 id="the_slide_title" class="slide-title"><?php echo main_slide_title(get_the_ID()); ?></h1>
											<?php the_content(); ?>
										</div>
									<?php else :?>
										<div class="subcontent-1  active">
											<?php the_content(); ?>
										</div>
									<?php endif ?>
								
								<!--SLIDES BEGIN aka custom fields data-->
									<?php 						
									   if( have_rows('histo_slide') ): 
										$count = 1;
									    $menu = ['Main Slide'];
									?>
									
									<?php while( have_rows('histo_slide') ): the_row(); 

										// vars
										$image = get_sub_field('slide_url');
										$content = get_sub_field('slide_text');
										$title = get_sub_field('slide_title');
										//$contentTrue = subTrue('slide_text');
										$count = $count+1;
										if ($title != ' '){
										array_push($menu,$title.$contentTrue);
										}
									?>
									<div class="subcontent-<?php echo $count;?> subslide" <?php get_post_background_img ($post)?>>
										<img src="<?php echo $image[url]; ?>" alt="<?php echo $title . ' ' . $content;?>">
										<?php if( $title ): ?>											
											<h3 class="slide-title">
												<?php echo $title; ?>
											</h3>
										<?php else: ?>
											<!--slide title-->
											<h3 class="slide-title">												
											</h3>
										<?php endif; ?>		
										<?php if( $content ): ?>								
									    	<?php echo $content;?>
									    <?php else: ?>
											<div class="slide-text"></div>
										<?php endif;?>
									</div>
									<?php endwhile; ?>	
								</div>
<!--SLIDE NATIGATION MENU-->
							<div class="button-wrap col-md-3">
								 <?php  
								 $length = count($menu);
								 $i = 0;
								 while ( $i < $length){
								 	echo '<a href="#" class="button">' .$menu[$i] . '</a>';
								 	$i++;
								 }

								 ?>
							</div>
							<!--END SLIDE MENU-->
						</div>
						
						<?php endif; ?>		
						<!--SUB PAGES MENU-->
						<?php if( have_rows('histo_slide')) {
//								echo '<div class="cell-topics">';
									 getPrevNext(); 
							} else {
								echo '<div class="cell-topics-list"><ul>';
									$post_id = get_the_ID();
									$ancestor_id = get_ancestors($post_id,'page', 'post_type')[0];
									wp_list_pages( array(
									'title_li'    => '',
									'child_of'    => $ancestor_id,
									'post_status' => 'publish',
									'orderby' => 'menu_order',
									) );
								echo '</ul>';
						} ?>										

						<!--</div>-->

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