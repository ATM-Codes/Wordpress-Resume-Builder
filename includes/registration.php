<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

/**
 * Register the "resume" custom post type
 */


function resbuild_setup_post_type()
{
	register_post_type(
		'resbuild_resume',
		array(
			'labels' => array(
				'name' => __('Resumes', 'resume-builder'),
				'singular_name' => __('Resume', 'resume-builder'),
			),
			'public' => false,
		),
	);
}

function resbuild_register_meta()
{
	register_post_meta('resbuild_resume', '_resbuild_content', array(
		'type' => 'object',
		'single' => true,
		'default' => [],
		'sanitize_callback' => 'resbuild_sanitize_content',
	));
}


/**
 * Allowed fields for each section type, and what kind of value each holds.
 */

function resbuild_section_fields()
{
	return array(
		'education' => array(
			'institution' => 'text',
			'qualification' => 'text',
			'grade' => 'text',
			'location' => 'text',
			'startDate' => 'date',
			'endDate' => 'date'
		),
		'experience' => array(
			'jobTitle' => 'text',
			'company' => 'text',
			'location' => 'text',
			'startDate' => 'date',
			'endDate' => 'date',
			'current' => 'bool',
			'bullets' => 'list'
		),
		'awards' => array(
			'awardName' => 'text',
			'organization' => 'text',
			'dateReceived' => 'date',
			'bullets' => 'list'
		),
	);
}

function resbuild_personal_fields()
{
	return array(
		'firstName' => 'text',
		'lastName' => 'text',
		'email' => 'email',
		'phone' => 'text',
		'linkedin' => 'text',
		'github' => 'text'
	);
}

/**
 * Clean one value according to its kind.
 */
function resbuild_resume_clean_value($value, $kind)
{
	switch ($kind) {
		case 'text':
			return sanitize_text_field((string) $value);
		case 'bool':
			return rest_sanitize_boolean($value);
		case 'date':
			$value = (string) $value;
			return preg_match('/^(19|20)\d{2}-(0[1-9]|1[0-2])$/', $value) ? $value : '';
		case 'list':
			if (!is_array($value)) {
				return array();
			}
			$strings = array_filter($value, 'is_string');
			return array_values(array_map('sanitize_text_field', $strings));
		case 'email':
			return sanitize_email((string) $value);
	}
	return '';
}


/**
 * Sanitize callback: rebuild the resume from known parts only.
 */
function resbuild_sanitize_content($input)
{
	if (!is_array($input)) {
		return array();
	}

	$clean = array(
		'personal' => array(),
		'sections' => array(),
	);

	//santising personal fields

	$input_personal = (isset($input['personal']) && is_array($input['personal'])) ? $input['personal'] : array();
	
	$personal_fields = resbuild_personal_fields();
	
	foreach ($personal_fields as $field => $kind) {
		$clean['personal'][$field] = resbuild_resume_clean_value($input_personal[$field] ?? '', $kind);
	}


	//santising sectional fields
	$sections = (isset($input['sections']) && is_array($input['sections'])) ? $input['sections'] : array();

	$section_fields = resbuild_section_fields();

	foreach ($sections as $section) {
		$type = is_array($section) ? ($section['type'] ?? '') : '';
		if (!isset($section_fields[$type])) {
			continue; // Unknown or malformed section: drop it.
		}

		$items = array();
		foreach ((array) ($section['items'] ?? array()) as $item) {
			if (!is_array($item)) {
				continue;
			}

			$clean_item = array('id' => sanitize_key($item['id'] ?? ''));

			foreach ($section_fields[$type] as $field => $kind) {
				$clean_item[$field] = resbuild_resume_clean_value($item[$field] ?? '', $kind);
			}

			if ( 'experience' === $type && ! empty( $clean_item['current'] ) ) {
				$clean_item['endDate'] = '';
			}

			$items[] = $clean_item;
		}

		$clean['sections'][] = array(
			'id' => sanitize_key($section['id'] ?? ''),
			'type' => $type,
			'items' => $items,
		);
	}

	return $clean;
}

add_action('init', 'resbuild_setup_post_type');
add_action('init', 'resbuild_register_meta');

