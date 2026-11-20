
<?php

/**
 * Fired when the plugin is uninstalled.
 *
 * @package resume-builder
 */

// if uninstall.php is not called by WordPress, die
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    die;
}

function resbuild_delete_all_custom_posts(){
    $post_ids = get_posts(
        array(
            'post_type' => 'resbuild_resume',
            'post_status'=> 'any',
            'numberposts'=> -1,
            'fields'=> 'ids',
            'no_found_rows'=>true
        )
    );

    if ( ! empty( $post_ids ) ) {
        foreach ( $post_ids as $post_id ) {
            wp_delete_post( $post_id,true );
        }
    }
}


resbuild_delete_all_custom_posts();

