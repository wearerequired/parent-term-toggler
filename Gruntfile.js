module.exports = function( grunt ) {

	require( 'load-grunt-tasks' )( grunt );

	grunt.initConfig( {
		babel: {
			options: {
				sourceMap: true,
				presets  : ['es2015']
			},
			dist   : {
				files: {
					'assets/js/dist/parent-term-toggler.js': 'assets/js/src/parent-term-toggler.js'
				}
			}
		},
		uglify: {
			'parent-term-toggler': {
				options: {
					sourceMap: false
				},
				files  : {
					'assets/js/dist/parent-term-toggler.min.js': 'assets/js/dist/parent-term-toggler.js'
				}
			}
		},
		watch: {
			babel: {
				files: 'assets/js/src/parent-term-toggler.js',
				tasks: [ 'babel', 'uglify:parent-term-toggler' ]
			}
		}
	} );

	grunt.registerTask( 'default', ['babel'] );
};
