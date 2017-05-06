'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global _ParentTermTogglerSettings */

var _window = window,
    $ = _window.jQuery;

var ParentTermToggler = function () {
	/**
  * Constructor.
  *
  * @param {string} taxonomy - The taxonomy name.
  */
	function ParentTermToggler(taxonomy) {
		_classCallCheck(this, ParentTermToggler);

		this.taxonomy = taxonomy;
		this.$metabox = $('#' + taxonomy + 'div');
	}

	/**
  * Toggle handler for change events.
  *
  * @param {object} event - Change event.
  */


	_createClass(ParentTermToggler, [{
		key: 'toggle',
		value: function toggle(event) {
			var $el = $(event.currentTarget);

			// Ignore changes to non-child terms.
			if (!this.termIsChild($el)) {
				return;
			}

			// Stop watching to avoid recursion.
			this.stopWatch();

			var isChecked = $el.is(':checked');
			this.traverseParentTermsAndSetChecked($el, isChecked);

			// Start watching again.
			this.watch();
		}

		/**
   * Gets all parent terms and (un)checks them.
   *
   * @param {object} $el - The jQuery element.
   * @param {boolean} checked - Whether the terms should be checked.
   */

	}, {
		key: 'traverseParentTermsAndSetChecked',
		value: function traverseParentTermsAndSetChecked($el) {
			var checked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			$el.parents('.children').each(function (index, element) {
				var $term = $(element).parent('li').find('input[type="checkbox"]').eq(0);

				if (checked === $term.prop('checked')) {
					return;
				}

				$term.trigger('click');
			});
		}

		/**
   * Whether a term has parent terms.
   *
   * @param {object} $el - The jQuery element.
   * @returns {boolean} True if a term has parent terms, false if not.
   */

	}, {
		key: 'termIsChild',
		value: function termIsChild($el) {
			return $el.closest('.children').length > 0;
		}

		/**
   * Attaches an event handler for checkbox changes.
   */

	}, {
		key: 'watch',
		value: function watch() {
			this.$metabox.on('change.parent-term-toggler', 'input[type="checkbox"]', this.toggle.bind(this));
		}

		/**
   * Removes the event handler for checkbox changes.
   */

	}, {
		key: 'stopWatch',
		value: function stopWatch() {
			this.$metabox.off('change.parent-term-toggler');
		}
	}]);

	return ParentTermToggler;
}();

$(function () {
	// Create a Toggler instance for each supported taxonomy.
	_ParentTermTogglerSettings.supportedTaxonomies.forEach(function (taxonomy) {
		var toggler = new ParentTermToggler(taxonomy);
		toggler.watch();
	});
});
//# sourceMappingURL=parent-term-toggler.js.map
