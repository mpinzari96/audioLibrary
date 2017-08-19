'use strict'

let grunt = require( 'grunt' )

// TODO:
module.exports = ( options ) => {
	grunt.registerTask( 'client-watch', [ 'exec' ] )
	grunt.registerTask( 'client-build', [ 'exec:build' ] )
	grunt.registerTask( 'client-install', [ 'exec:install' ] )
}
