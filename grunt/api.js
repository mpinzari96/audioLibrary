'use strict'

let grunt = require( 'grunt' )

// TODO:  Add task for start docker and running docker-compose up
module.exports = ( options ) => {
	grunt.registerTask( 'api-watch', [ 'nodemon' ] )
}
