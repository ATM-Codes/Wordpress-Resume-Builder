<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Register the "resume" custom post type
 */
function resbuild_setup_post_type() {
	register_post_type( 'resbuild_resume', array(
			'labels'      => array(
				'name'          => __('Resumes', 'resume-builder'),
				'singular_name' => __('Resume', 'resume-builder'),
			),
            'public'=> false,
		),
        );    
} 
add_action( 'init', 'resbuild_setup_post_type' );

