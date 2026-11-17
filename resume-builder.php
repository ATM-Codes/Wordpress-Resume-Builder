<?php

/**
 * @wordpress-plugin
 * Plugin Name:       Resume Builder
 * Plugin URI:        https://github.com/ATM-Codes/Wordpress-Resume-Builder
 * Description:       This plugin lets a user create and manage a resume/CV using a React-powered interface.
 * Version:           1.0.0
 * Author:            ATM-Codes
 * Author URI:        https://github.com/ATM-Codes/
 * Text Domain:       resume-builder
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Requires at least: 7.1
 * Requires PHP:      8.3
 * Update URI:  false
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

require_once __DIR__. '/includes/registration.php';
require_once __DIR__. '/includes/rest-api.php';