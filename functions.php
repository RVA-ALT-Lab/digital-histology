<?php
function theme_enqueue_styles() {

    $parent_style = 'parent-style';

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css', array(), filemtime( get_stylesheet_directory() . '/style.css' ) );
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
        //wp_enqueue_script('vue-js', 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',$deps, $version, $in_footer);
        wp_enqueue_script('menu-js', get_stylesheet_directory_uri() . '/js/menu.js',$deps, $version, $in_footer);        
        $histology_directory = array( 'data_directory' => get_stylesheet_directory_uri() );
        wp_localize_script( 'menu-js', 'histology_directory', $histology_directory );
    }
}

add_action('wp_enqueue_scripts', 'load_my_script');


if(!function_exists('hist_script')){
    function hist_script() {
        global $post;
        $version= '1.2';
        $in_footer = true;
        wp_enqueue_script('histology-script', get_stylesheet_directory_uri() . '/js/extras.js', array('jquery', 'menu-js'), $version, $in_footer);
    }
}

add_action('wp_enqueue_scripts', 'hist_script');






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
                    $parents .= '<span class="item-parent item-parent-' . $ancestor . '"><a class="bread-parent bread-parent-' . $ancestor . '" href="' . site_url() .'?menu=menu_' . $ancestor . '" title="' . get_the_title($ancestor) . '">' . get_the_title($ancestor) . '</a></span>';
                    $parents .= '<span class="separator separator-' . $ancestor . '"> &#187; </span>';
                }

                // Display parent pages
                echo $parents;

                // Current page
                echo '<span class="item-current item-' . $post->ID . '"><strong title="' . get_the_title() . '"> ' . get_the_title() . '</strong></span>';
                echo '<button class="eyeball" id="quizzer">Hide</button>';
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

        echo '<div class="navigation col-md-9" id="hist-nav" data-pages="'.$page_num.'">';

        if (!empty($prevID)) {
            echo '<a href="';
            echo get_permalink($prevID);
            echo '" ';
            echo 'title="';
            echo get_the_title($prevID);
            echo'"><div class="col-md-5 nav-arrow" id="nav-arrow-left"><img src="'.get_stylesheet_directory_uri().'/imgs/arrow_left_ai.svg" alt="Left arrow."> PREVIOUS';
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
        if ($page_num >1){
        echo '<div class="page-slider col-md-12"><input type="range" min="1" max="'.$page_num.'" value="'.($current+1).'" class="slider" id="slide-the-pages"></div>';
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
                        'parent' => $parent,
                        'post_type' => 'page',
                        'post_status' => 'publish',
                        'sort_column'  => 'post_date'
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

function main_slide_title($post_id){
    if(get_field('main_slide_title', $post_id)){
        return get_field('main_slide_title', $post_id);
    }
}


//sets a custom field to indicate if a page has children to save a call later
// add_action( 'save_post', 'has_child_meta' );

// function has_child_meta(){
//     global $post;
//     $post_id = $post->ID;
//      if (get_post_type($post_id)==='page'){
//          $args = array(
//                 'parent' => $post_id,
//                 'post_type' => 'page',
//                 'post_status' => 'publish',
//                 'number' => 1, //we only need one
//             );
//          $pages = get_pages($args);
//          $number = sizeof($pages);
//         if ($number != 0 ) {
//             add_post_meta($post_id, 'has_children', 1, true);
//         } else {
//             add_post_meta($post_id, 'has_children', 0, true);
//         }
//     }
// }

// add_action( 'save_post', 'has_child_meta_to_parent' );
// function has_child_meta_to_parent(){
//     global $post;
//     $parent = $post->post_parent;
//         if ($parent != 0 ) {
//             add_post_meta($parent, 'has_children', 1, true);
//         } else {
//             add_post_meta($parent, 'has_children', 0, true);
//         }
//     }

//PUTS has_children INTO THE API
function children_get_post_meta_cb($object, $field_name, $request){
        return get_post_meta($object['id'], $field_name, true);
}
function children_update_post_meta_cb($value, $object, $field_name){
  return update_post_meta($object['id'], $field_name, $value);
}
add_action('rest_api_init', function(){
  register_rest_field('page', 'has_children',
    array(
    'get_callback' => 'children_get_post_meta_cb',
    'update_callback' => 'children_update_post_meta_cb',
    'schema' => null
    )
  );
});

//THIS LETS US SEARCH BY has_children variables
add_filter( 'rest_page_query', function( $args, $request ) {
    $has_children   = $request->get_param( 'has_children' );

    if ( ! empty( $has_children ) ) {
        $args['meta_query'] = array(
            array(
                'key'     => 'has_children',
                'value'   => $has_children,
                'compare' => '=',
            )
        );
    }

    return $args;
}, 10, 2 );



//make ACF let you see custom fields
add_filter( 'acf/settings/remove_wp_meta_box', '__return_false' );


//MODIFY H5P TO GO FULL SCREEN

function h5p_full_img_alter_styles(&$styles, $libraries, $embed_type) {
  $styles[] = (object) array(
    // Path must be relative to wp-content/uploads/h5p or absolute.
    'path' => get_stylesheet_directory_uri() . '/custom-h5p.css',
    'version' => '?ver=0.1' // Cache buster
  );
}
add_action('h5p_alter_library_styles', 'h5p_full_img_alter_styles', 10, 3);

//Add support for creation of static menu file
function histology_create_menu($post_id) {
    global $wpdb;
    $results = $wpdb->get_results( "SELECT `ID`, `post_title`, `post_parent`, `post_name` FROM {$wpdb->prefix}posts WHERE post_type='page' and post_status = 'publish' ", ARRAY_A );
    foreach($results as &$result){
        $result['guid'] = 'https://rampages.us/histology/?page_id=' . $result['ID'];
    }
    file_put_contents(get_stylesheet_directory() . '/results.json', json_encode($results));

}
add_action('save_post', 'histology_create_menu');



//new minor index page list maker

function make_nav_list(){
    global $post;
        wp_list_pages(array(
        'child_of' => $post->ID,
        'title_li' => '',
        'sort_column' => 'post_date',
    ));
}

function randomHomeBackground(){
    $rows = get_field('background' ); // get all the rows
    $rand_row = $rows[ array_rand( $rows ) ]; // get a random row
    $rand_row_image = $rand_row['background_image' ]; // get the sub field value 

    return $rand_row_image;
}



//ADD SEARCH TO NAV

function add_last_nav_item($items) {
  return $items .= '<li><form class="navbar-form navbar-right" role="search" method="get" id="searchform" action="' . home_url( '/' ) . '"><div class="form-group"><input name="s" id="s" type="text" class="search-query form-control" autocomplete="off" placeholder="Search"></div></form></li>';
}
add_filter('wp_nav_menu_items','add_last_nav_item');



//ADD return to index for quizzes
function extra_quiz_nav($content) {
 global $post;
  $html = '<p><a class="btn btn-primary quiz-index" href="https://rampages.us/histology/quizzes/">Return to the quiz menu</a></p>';
  if ($post->post_parent === 21265) {
    return $content . $html;
  } else {
  	return $content;
  }
}

add_filter( 'the_content', 'extra_quiz_nav' );

