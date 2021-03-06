/* global _ParentTermTogglerSettings */

const { jQuery: $ } = window;

class ParentTermToggler {
	/**
	 * Constructor.
	 *
	 * @param {string} taxonomy - The taxonomy name.
	 */
	constructor( taxonomy ) {
		this.taxonomy = taxonomy;
		this.$metabox = $( `#${taxonomy}div` );
	}

	/**
	 * Toggle handler for change events.
	 *
	 * @param {object} event - Change event.
	 */
	toggle( event ) {
		let $el = $( event.currentTarget );

		// Change $el if a popular term is selected.
		if ( $el.closest( 'li.popular-category' ).length ) {
			const id = $el.attr( 'id' ).replace( 'popular-', '' );
			$el = $( `#${id}` );
		}

		// Ignore changes to non-child terms.
		if ( ! this.termIsChild( $el ) ) {
			return;
		}

		// Stop watching to avoid recursion.
		this.stopWatch();

		const isChecked = $el.is( ':checked' );
		this.traverseParentTermsAndSetChecked( $el, isChecked );

		// Start watching again.
		this.watch();
	}

	/**
	 * Gets all parent terms and (un)checks them.
	 *
	 * @param {object} $el - The jQuery element.
	 * @param {boolean} checked - Whether the terms should be checked.
	 */
	traverseParentTermsAndSetChecked( $el, checked = true ) {
		$el.parents( '.children' ).each( ( index, element ) => {
			const $term = $( element ).parent( 'li' ).find( 'input[type="checkbox"]' ).eq( 0 );

			if ( checked === $term.prop( 'checked' ) ) {
				return;
			}

			$term.trigger( 'click' );
		} );
	}

	/**
	 * Whether a term has parent terms.
	 *
	 * @param {object} $el - The jQuery element.
	 * @returns {boolean} True if a term has parent terms, false if not.
	 */
	termIsChild( $el ) {
		return $el.closest( '.children' ).length > 0;
	}

	/**
	 * Attaches an event handler for checkbox changes.
	 */
	watch() {
		this.$metabox.on( 'change.parent-term-toggler', 'input[type="checkbox"]', this.toggle.bind( this ) )
	}

	/**
	 * Removes the event handler for checkbox changes.
	 */
	stopWatch() {
		this.$metabox.off( 'change.parent-term-toggler' );
	}
}

$( () => {
	// Create a Toggler instance for each supported taxonomy.
	_ParentTermTogglerSettings.supportedTaxonomies.forEach( ( taxonomy ) => {
		let toggler = new ParentTermToggler( taxonomy );
		toggler.watch();
	} );
} );
