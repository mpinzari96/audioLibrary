module.exports = (grunt) => {

    // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);

    // Load all custom tasks
    require('load-grunt-config')(grunt);

    // //Register all docker compose targets
    // [ 'up', 'down', 'stop', 'restart', 'logs', 'build', 'pull', 'exec', 'config' ].forEach( function( target ) {
    // 	grunt.registerTask( target, function() {
    // 		var args = '';
    // 		if( this.args.length > 0 ) {
    // 			args += ':' + this.args.join( ':' )
    // 		}
    // 		grunt.task.run( 'dockerCompose:' + target + args );
    // 	} );
    // } )


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            test: {
                NODE_ENV: 'test',
                DATABASE_AUTOUPDATE: true
            },
            dev: {
                NODE_ENV: 'development'
            },
            prod: {
                NODE_ENV: 'production'
            }
        },
        nodemon: {
            dev: {
                script: './server/server.js',
                options: {
                    args: ['dev'],
                    cwd: __dirname,
                    ignore: ['node_modules/**'],
                    ext: 'js,json',
                    watch: ['./common', './server'],
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    timeout: 10000,
                    // Require blanket wrapper here to instrument other required
                    // files on the fly.
                    //
                    // NB. We cannot require blanket directly as it
                    // detects that we are not running mocha cli and loads differently.
                    //
                    // NNB. As mocha is 'clever' enough to only run the tests once for
                    // each file the following coverage task does not actually run any
                    // tests which is why the coverage instrumentation has to be done here
                    // require: 'coverage/blanket'
                },
                src: ['test/**/*.js']
            }
        },
        exec: {
            dev: {
                cmd: 'npm run build-dev',
                cwd: 'client/'
            },
            install: {
                cmd: 'npm install',
                cwd: 'client/',
                stdout: true,
                stderr: true
            },
            build: {
                cmd: 'npm run build-ci',
                cwd: 'client/',
                stdout: true,
                stderr: true
            },
            test: {
                cmd: 'npm test',
                cwd: 'client/',
                stdout: true,
                stderr: true
            }
        }
    })


    // API
    grunt.registerTask('api', ['env:dev', 'api-watch'])
    grunt.registerTask('api-prod', ['env:prod','api-watch'])
    grunt.registerTask('test-api', ['env:test', 'mochaTest'])

    // Client
    grunt.registerTask('client', ['client-watch'])
    grunt.registerTask('install-client-dependencies', ['client-install'])
    grunt.registerTask('build-client', ['exec:build'])
    grunt.registerTask('test-client', ['exec:test'])

    grunt.registerTask('run-database-clean-migrate', ['db-clean', 'db-migrate', 'db-info'])
    grunt.registerTask('run-import', ['db-import-validate', 'db-import-process'])
    //grunt.registerTask('run-import-production', ['db-import-validate-production', 'db-import-process-production'])


}
