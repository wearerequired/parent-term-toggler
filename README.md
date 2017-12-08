# Parent Term Toggler

WordPress plugin to automatically toggle the parent term when a sub term is selected.

## Customizing

Use the `parent_term_toggler.supported_taxonomies` filter to limit the list of supported taxonomies for this feature.

## Development

The plugin uses `grunt` to compile the ES6 JavaScript file with [Babel](https://babeljs.io/).

	$ npm install
	$ grunt # Compiles JavaScript file and creates minified version.
	$ grunt watch # Use during development.

## Changelog

### 1.0.0
* Initial Release
