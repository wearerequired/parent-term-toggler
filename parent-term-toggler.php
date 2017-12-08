<?php
/**
 * Plugin Name: Parent Term Toggler
 * Plugin URI:  https://github.com/wearerequired/parent-term-toggler/
 * Description: Automatically toggle the parent term when a sub term is selected.
 * Version:     1.0.0
 * Author:      required
 * Author URI:  https://required.com
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Copyright (c) 2017 required (email: info@required.ch)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * @package ParentTermToggler
 */

namespace Required\ParentTermToggler;

define( __NAMESPACE__ . '\PLUGIN_FILE', __FILE__ );
define( __NAMESPACE__ . '\PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
define( __NAMESPACE__ . '\PLUGIN_DIR', __DIR__ );

/**
 * Enqueues script if current screen has supported taxonomies.
 */
function enqueue_script() {
	$screen = get_current_screen();
	if ( ! $screen || 'post' !== $screen->base || ! $screen->post_type ) {
		return;
	}

	$taxonomies = get_object_taxonomies( $screen->post_type, 'objects' );
	$taxonomies = wp_filter_object_list( $taxonomies, [ 'hierarchical' => true ], 'and', 'name' );

	/**
	 * Filters the list of supported taxonomies.
	 *
	 * @since 1.0.0
	 *
	 * @param array  $taxonomies An array of taxonomy slugs.
	 * @param string $post_type  The post type of the current admin screen.
	 */
	$taxonomies = apply_filters( 'parent_term_toggler.supported_taxonomies', $taxonomies, $screen->post_type );

	if ( ! $taxonomies ) {
		return;
	}

	$suffix = SCRIPT_DEBUG ? '' : '.min';

	wp_enqueue_script(
		'parent-term-toggler',
		plugins_url( "assets/js/dist/parent-term-toggler$suffix.js", PLUGIN_FILE ),
		[ 'jquery' ],
		'20170506',
		true
	);

	wp_localize_script(
		'parent-term-toggler',
		'_ParentTermTogglerSettings',
		[
			'supportedTaxonomies' => array_values( $taxonomies ),
		]
	);
}
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\enqueue_script' );

/**
 * Disables the on-top feature for checked terms.
 *
 * This is required so that we check whether a checked term has parent terms.
 *
 * @param array $args An array of arguments.
 * @return array An array of arguments.
 */
function disable_checked_terms_ontop( $args ) {
	$args['checked_ontop'] = false;
	return $args;
}
add_filter( 'wp_terms_checklist_args', __NAMESPACE__ . '\disable_checked_terms_ontop' );
