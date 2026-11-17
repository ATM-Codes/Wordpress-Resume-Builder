<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

add_action( 'rest_api_init', 'resbuild_register_routes' );


//GET route
function resbuild_register_routes() {
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
}

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

function resbuild_get_resume( WP_REST_Request $request ) {
	return rest_ensure_response( resbuild_format_resume( get_post( $request['id'] ) ) );
}


function resbuild_format_resume( WP_Post $post ) {
	$modified = get_post_modified_time( 'c', true, $post );

    return array(
		'id'       => $post->ID,
		'title'    => $post->post_title,
		'content'  => get_post_meta( $post->ID, '_resbuild_content', true ),
		'modified' => $modified ?: null,
	);
}