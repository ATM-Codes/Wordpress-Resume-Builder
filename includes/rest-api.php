<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}


/**
 * This is the start of the rest api section of the plugin.
 * resbuild_register_routes()   This function registers the REST API routes
 */
add_action( 'rest_api_init', 'resbuild_register_routes' );


function resbuild_register_routes() {

    //GET one resume route
	register_rest_route( 'resbuild/v1', '/resumes/(?P<id>\d+)', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => 'resbuild_get_resume',
		'permission_callback' => 'resbuild_can_access_resume',
		'args'                => array(
			'id' => array(
				'type'              => 'integer',
				'required'          => true,
				'sanitize_callback' => 'absint',
			),
		),
	) );

    //GET all resumes route
   	register_rest_route( 'resbuild/v1', '/resumes', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => 'resbuild_get_resumes',
		'permission_callback' => 'resbuild_require_login',
	) );

    //POST route
    register_rest_route( 'resbuild/v1', '/resumes', array(
		'methods'             => WP_REST_Server::CREATABLE,
		'callback'            => 'resbuild_create_resume',
		'permission_callback' => 'resbuild_require_login',

        'args'                => array(
			'title' => array(
                'type' => 'string',
                'required' => true,
                'minLength'=> 1,
				'sanitize_callback' => 'sanitize_text_field',
                'validate_callback' => 'rest_validate_request_arg'
			),
           	'content' => array(
                'type' => 'object',
                'required' => true,
			),
		),
	) );

	//PUT Route
	register_rest_route( 'resbuild/v1', '/resumes/(?P<id>\d+)', array(
		'methods'             => WP_REST_Server::EDITABLE,
		'callback'            => 'resbuild_edit_resume',
		'permission_callback' => 'resbuild_can_access_resume',
		'args'                => array(
			'id' => array(
				'type'              => 'integer',
				'required'          => true,
				'sanitize_callback' => 'absint',
			),
			'title' => array(
                'type' => 'string',
                'required' => false,
                'minLength'=> 1,
				'sanitize_callback' => 'sanitize_text_field',
                'validate_callback' => 'rest_validate_request_arg'
			),
			'content' => array(
                'type' => 'object',
                'required' => false,
			),
		),
	) );

	//DELETE Route
	register_rest_route( 'resbuild/v1', '/resumes/(?P<id>\d+)', array(
		'methods'             => WP_REST_Server::DELETABLE,
		'callback'            => 'resbuild_delete_resume',
		'permission_callback' => 'resbuild_can_access_resume',
		'args'                => array(
			'id' => array(
				'type'              => 'integer',
				'required'          => true,
				'sanitize_callback' => 'absint',
			),
		),
	) );
}

//Check permissions and access checks for one resume 
function resbuild_can_access_resume( WP_REST_Request $request ) {
	if ( ! is_user_logged_in() ) {
		return new WP_Error( 'resbuild_not_logged_in', __( 'You must be logged in.', 'resume-builder' ), array( 'status' => 401 ) );
	}

	$post = get_post( $request['id'] );
	if ( ! $post || 'resbuild_resume' !== $post->post_type ) {
		return new WP_Error( 'resbuild_not_found', __( 'Resume not found.', 'resume-builder' ), array( 'status' => 404 ) );
	}

	$is_owner = (int) $post->post_author === get_current_user_id();
	if ( ! $is_owner && ! current_user_can( 'edit_others_posts' ) ) {
		return new WP_Error( 'resbuild_forbidden', __( 'You cannot access this resume.', 'resume-builder' ), array( 'status' => 403 ) );
	}

	return true;
}

function resbuild_require_login( WP_REST_Request $request ) {
	if ( ! is_user_logged_in() ) {
		return new WP_Error( 'resbuild_not_logged_in', __( 'You must be logged in.', 'resume-builder' ), array( 'status' => 401 ) );
	}
	return true;
}


//GET one resume
function resbuild_get_resume( WP_REST_Request $request ) {
	return rest_ensure_response( resbuild_format_resume( get_post( $request['id'] ) ) );
}

//GET multiple resumes
function resbuild_get_resumes(WP_REST_Request $request ) {

    $recent_posts = get_posts( array(
        'posts_per_page' => -1,
        'post_status' => 'private',
        'post_type' => 'resbuild_resume',
        'author' => get_current_user_id(),
        'order' => 'DESC',
        'orderby'=> 'modified',
    ));
	return rest_ensure_response( resbuild_format_resumes( $recent_posts ) );
}

//Formatting posts functions
function resbuild_format_resume( WP_Post $post ) {
	$modified = get_post_modified_time( 'c', true, $post );
    return array(
		'id'       => $post->ID,
		'title'    => $post->post_title,
		'content'  => get_post_meta( $post->ID, '_resbuild_content', true ),
		'modified' => $modified ?: null,
	);
}

function resbuild_format_resumes( array $posts ) {

    $formatted_posts = array_map('resbuild_format_resume',$posts);

    return $formatted_posts;
}

/**
 * This section is for POST methods with the REST API routes
 */

function resbuild_create_resume(WP_REST_Request $request) {
	
    $my_post = array(
        'post_title' => $request->get_param('title'),
        'post_status' => 'private',
        'post_type' => 'resbuild_resume',
        'post_author' => get_current_user_id(),
	);

    $post_id=wp_insert_post($my_post,true);
    // Insert the post into the database
    if(!is_wp_error($post_id)){
        update_post_meta($post_id,'_resbuild_content',$request['content']);
        return new WP_REST_Response(resbuild_format_resume( get_post( $post_id )),201);
    }else{
        return $post_id;
    }

}

/**
 * This section is for PUT methods with the REST API routes
 */

function resbuild_edit_resume(WP_REST_Request $request){
	$post_args = array(
		'ID' => $request['id'],
		);

	if($request->has_param('title')){
		$post_args['post_title']=$request['title'];
	}

    $result=wp_update_post($post_args,true);
	
	if(is_wp_error($result)){
		return $result;
	}

	if($request -> has_param('content')){
        update_post_meta($post_args['ID'],'_resbuild_content',$request['content']);
        }
    
	return new WP_REST_Response(resbuild_format_resume( get_post( $post_args['ID'] )),200);
}

/**
 * This section is for DELETE methods with the REST API routes
 */


function resbuild_delete_resume(WP_REST_Request $request){
	$post_id = $request['id'];

    $result=wp_delete_post($post_id,true);
	
	if($result == false) {
		return new WP_Error('resbuild_delete_failed',__( 'The post could not be deleted', 'resume-builder' ), array( 'status' => 500));
	}
   
	return new WP_REST_Response(array('id'=>$post_id,'deleted'=>true),200);
	
}