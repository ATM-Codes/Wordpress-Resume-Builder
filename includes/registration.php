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


function resbuild_sanitize_content($content){
	if(!is_array($content)){
		return array();
	}
		return $content;
}


function resbuild_register_meta() {
register_post_meta('resbuild_resume', '_resbuild_content', array (
	'type'=>'object',
	'single' => true,
	'default'=> [],
	'sanitize_callback' => 'resbuild_sanitize_content',
));}

add_action( 'init', 'resbuild_setup_post_type' );
add_action( 'init', 'resbuild_register_meta' );

