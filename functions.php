<?php
function theme_enqueue_styles() {

    $parent_style = 'parent-style';

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style )
    );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
add_filter('widget_text', 'do_shortcode');

//function to call first uploaded image in functions file
function main_image() {
$files = get_children('post_parent='.get_the_ID().'&post_type=attachment
&post_mime_type=image&order=desc');
  if($files) :
    $keys = array_reverse(array_keys($files));
    $j=0;
    $num = $keys[$j];
    $image=wp_get_attachment_image($num, 'large', true);
    $imagepieces = explode('"', $image);
    $imagepath = $imagepieces[1];
    $main=wp_get_attachment_url($num);
		$template=get_template_directory();
		$the_title=get_the_title();
    print "<img src='$main' alt='$the_title' class='frame' />";
  endif;
}

if(!function_exists('load_my_script')){
    function load_my_script() {
        global $post;
        $deps = array('jquery');
        $version= '1.0'; 
        $in_footer = true;
        wp_enqueue_script('my-script', get_stylesheet_directory_uri() . '/js/extras.js', $deps, $version, $in_footer);
           }
}
add_action('wp_enqueue_scripts', 'load_my_script');

// Load Font Awesome
add_action( 'wp_enqueue_scripts', 'enqueue_font_awesome' );
function enqueue_font_awesome() {

    wp_enqueue_style( 'font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css' );

}

// Breadcrumbs via https://www.thewebtaylor.com/articles/wordpress-creating-breadcrumbs-without-a-plugin

function custom_breadcrumbs(){
    global $post;
    if( $post->post_parent ){
                   
                // If child page, get parents 
                $anc = get_post_ancestors( $post->ID );
                   
                // Get parents in the right order
                $anc = array_reverse($anc);
                   
                // Parent page loop
                if ( !isset( $parents ) ) $parents = null;
                $parents .= '<span class="item-parent"><a class="bread-parent" href="/histology">Main Menu</a> &#187; </span> ';
                foreach ( $anc as $ancestor ) {
                    $parents .= '<span class="item-parent item-parent-' . $ancestor . '"><a class="bread-parent bread-parent-' . $ancestor . '" href="' . get_permalink($ancestor) . '" title="' . get_the_title($ancestor) . '">' . get_the_title($ancestor) . '</a></span>';
                    $parents .= '<span class="separator separator-' . $ancestor . '"> &#187; </span>';
                }
                   
                // Display parent pages
                echo $parents;
                   
                // Current page
                echo '<h1 class="item-current item-' . $post->ID . '"><strong title="' . get_the_title() . '"> ' . get_the_title() . '</strong></h1>';
                   
            } else {
                   
                // Just display current page if not parents
                echo '<span class="item-current item-' . $post->ID . '"><strong class="bread-current bread-' . $post->ID . '"> ' . get_the_title() . '</strong></span>';
                   
            }
    }

    //background image setter
function get_post_background_img ($post) {
  if ( $thumbnail_id = get_post_thumbnail_id($post) ) {
        if ( $image_src = wp_get_attachment_image_src( $thumbnail_id, 'full-size' ) )
            printf( ' style="background-image: url(%s);"', $image_src[0] );     
    }
}            


//next and prev pagination for pages from https://codex.wordpress.org/Next_and_Previous_Links#The_Next_and_Previous_Pages

//gets the ones that have kids out of the mix 
function has_kids($pageID) {
    $args = array(
    'post_parent' => $pageID,
    'post_type'   => 'page', 
    'numberposts' => 1,
    'post_status' => 'publish',
    'orderby' => 'date_published', 
);
    $children = get_children( $args );
    return sizeof($children);
}


//THIS IS THE NEXT SLIDE FUNCTION AT THE BOTTOM OF THE PAGE
function getPrevNext(){
    $post_id = get_the_ID();
    $ancestor_id = get_ancestors($post_id,'page', 'post_type')[0];
    $pagelist = get_pages( array(
     'parent'=> $ancestor_id,
     'sort_order' => 'asc',
     'sort_column'  => 'post_date' //sorting by date created as a way to avoid 01 necessity
      ) );
      
        $pages = array();
        //remove kids
        foreach ($pagelist as $page) {
            if(has_kids($page->ID)===0){
                    $pages[] += $page->ID;
                }
        }
        $current = array_search(get_the_ID(), $pages);

        $page_num =sizeof($pages);
        
        $prevID = $pages[$current-1];
        $nextID = $pages[$current+1];
        
        echo '<div class="navigation col-md-9">';
        
        if (!empty($prevID)) {
            echo '<a href="';
            echo get_permalink($prevID);
            echo '" ';
            echo 'title="';
            echo get_the_title($prevID); 
            echo'"><div class="col-md-5 nav-arrow" id="nav-arrow-left"><img src="'.get_stylesheet_directory_uri().'/imgs/arrow_left_ai.svg" alt="Left arrow."> PREV';
            echo '</div>';
            echo '</a>';
        }
        
        if (empty($prevID)){
            echo '<div class="col-md-5 nav-arrow-empty" id="nav-arrow-left"></div>';
        }
        echo '<div class="total-pages col-md-2">'.($current+1) . ' of ' . $page_num . '</div>';
        if (!empty($nextID)) {
           
            echo '<a href="';
            echo get_permalink($nextID);
            echo '"';
            echo 'title="';
            echo get_the_title($nextID); 
            echo'"><div class="col-md-5 nav-arrow" id="nav-arrow-right">NEXT <img src="'.get_stylesheet_directory_uri().'/imgs/arrow_right_ai.svg" alt="Right arrow." ></div></a>';
           
        }
}   


//true false for slide navigation 
function subTrue ($fieldName){
    if (get_sub_field($fieldName)){
        return '<i class="fa fa-angle-double-right" aria-hidden="true"></i>';
    }
}

function remove_my_parent_theme_function() {
    remove_filter('the_content', 'wp_bootstrap_first_paragraph');
}
add_action('wp_loaded', 'remove_my_parent_theme_function');


//main menu construction


function makeMenu($parent = 0, $the_class ='main-header') {
         $args = array(
                        'sort_order' => 'asc',
                        'sort_column' => 'post_title',                      
                        'parent' => $parent,                      
                        'post_type' => 'page',
                        'post_status' => 'publish',
                        'sort_column'  => 'menu_order, post_title'
                    ); 
                    $pages = get_pages($args); 
                    $number = sizeof($pages);
                    $i = 0;
                    while ($i < $number){
                        echo '<li class="'.$the_class. ' parent'. $parent .'"><a href="'.$pages[$i]->guid.'">'.$pages[$i]->post_title .'</a>';
                        $parent_id = $pages[$i]->ID;
                        if (get_pages(array('child_of'=> $parent_id))) {
                        echo '<ul class="children parent'.$parent_id.'">';
                        makeMenu($parent_id, 'page-item'); 
                        echo '</ul>';
                    }
                    echo '</li>';
                        $i++;
                    }
                    
                }

function main_slide_title($id){
    if(get_field('main_slide_title', $id)){
        return get_field('main_slide_title', $id);
    }
}                