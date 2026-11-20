<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

add_shortcode('resume_builder','resbuild_render_shortcode');

/**
 * This code contains the necessary parts for the resume builder app or a login screen
 * to be deployed via a shortcode.
 *
 * @return string $message Login prompt HTML.
 */

function resbuild_render_shortcode(){
    if ( ! is_user_logged_in() ) 
    {
        $message = sprintf(
            '<p>%s <a href="%s">%s</a></p>',
            esc_html__( 'Please log in to create your CVs.', 'resume-builder' ),
            esc_url( wp_login_url( get_permalink() ) ),
            esc_html__( 'Log in', 'resume-builder' )
        );

        /**
         * Filters the message shown to logged-out visitors in place of the resume builder.
         *
         * @param string $message Login prompt HTML.
         */
	    $message = apply_filters( 'resbuild_login_message', $message );

	    return wp_kses_post( $message );
    }
    
    resbuild_enqueue_app();

    return '<div id="resume-builder-app"></div>';

}

/**
 * Enqueue the compiled React app and its styles.
 */

function resbuild_enqueue_app(){
    $asset_file = plugin_dir_path(RESBUILD_PLUGIN_FILE).'build/index.asset.php';
    
    if(!file_exists($asset_file)){
        return;
    }

    $asset = include $asset_file;

    wp_enqueue_script(
        'resume-builder-app',
        plugins_url('build/index.js',RESBUILD_PLUGIN_FILE),
        $asset['dependencies'],
        $asset['version'],
        true
    );

    wp_set_script_translations('resume-builder-app','resume-builder');

    if(file_exists(plugin_dir_path(RESBUILD_PLUGIN_FILE).'build/index.css')){
        wp_enqueue_style(
            'resume-builder-app',
            plugins_url('build/index.css',RESBUILD_PLUGIN_FILE),
            array(),
            $asset['version']
        );
    }

}

