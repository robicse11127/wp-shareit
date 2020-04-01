'use strict';
module.exports = function( grunt ) {
    var pkg = grunt.file.readJSON( 'package.json' );
    grunt.initConfig({

        // Setting folder templates
        dirs: {
            admin_dist: 'admin/dist/',
            admin_source: 'admin/source/',
            public_dist: 'frontend/dist/',
            public_source: 'frontend/source/',
        },

        // Minify all css files
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                sourceMap: true,
            },
            target: {
                files: {
                    '<%= dirs.admin_dist %>/css/admin.css': '<%= dirs.admin_source %>/css/admin.css',
                    '<%= dirs.admin_dist %>/css/admin.min.css': '<%= dirs.admin_dist %>/css/admin.css',
                
                    '<%= dirs.public_dist %>/css/public.css': '<%= dirs.public_source %>/css/public.css',
                    '<%= dirs.public_dist %>/css/public.min.css': '<%= dirs.public_dist %>/css/public.css',
                }
            }
        },

        // Minify all js files
        uglify: {
            options: {
                sourceMap: true,
                mangle: false,
            },
            my_target: {
                files: {
                    '<%= dirs.admin_dist %>js/admin.min.js': [
                        '<%= dirs.admin_source %>js/*.js',
                    ],
                    
                    '<%= dirs.public_dist %>js/public.min.js': [
                        '<%= dirs.public_source %>js/*.js',
                    ],
                }
            }
        },

        // Watching all changes
        watch: {
            sass: {
                files: [
                    '<%= dirs.admin_source %>/css/**/*.css', 
                    '<%= dirs.public_source %>/css/**/*.css',
                ],
                tasks: ['cssmin'],
                livereload: {
                    options: {
                        livereload: true
                    }
                }
            },
            scripts: {
                files: [
                    '<%= dirs.admin_source %>/js/*.js',
                    '<%= dirs.public_source %>/js/*.js',
                ],
                tasks: ['uglify']
            }
        },

        // Generate POT files.
        makepot: {
            target: {
                options: {
                    domainPath: '/languages/', // Where to save the POT file.
                    potFilename: 'wp-shareit.pot', // Name of the POT file.
                    type: 'wp-plugin', // Type of project (wp-plugin or wp-theme).
                    potHeaders: {
                        'report-msgid-bugs-to': 'https://wpartisans.com',
                        'language-team': 'LANGUAGE <EMAIL@ADDRESS>'
                    }
                }
            }
        },

        // Generate Text Domain
        addtextdomain: {
            options: {
                textdomain: 'wp-shareit',
                updateDomains: ['wp-shareit']
            },
            target: {
                files: {
                    src: [
                        '*.php',
                        '**/*.php',
                        '!node_modules/**',
                        '!tests/**'
                    ]
                }
            }
        },

        // Clean up build directory
        clean: {
            main: ['build/']
        },

        // Copy the plugin into the build directory
        copy: {
            main: {
                src: [
                    '**',
                    '!node_modules/**',
                    '!build/**',
                    '!bin/**',
                    '!.git/**',
                    '!Gruntfile.js',
                    '!package.json',
                    '!debug.log',
                    '!phpunit.xml',
                    '!.gitignore',
                    '!.gitmodules',
                    '!npm-debug.log',
                    '!assets/less/**',
                    '!tests/**',
                    '!**/Gruntfile.js',
                    '!**/package.json',
                    '!**/package-lock.json',
                    '!**/README.md',
                    '!**/export.sh',
                    '!**/*~'
                ],
                dest: 'build/'
            }
        },

        //Compress build directory into <name>.zip and <name>-<version>.zip
        compress: {
            main: {
                options: {
                    mode: 'zip',
                    archive: './build/wp-shareit-v-'+ pkg.version + '.zip'
                },
                expand: true,
                cwd: 'build/',
                src: ['**/*'],
                dest: 'wp-shareit'
            }
        },
    });

    // Load NPM tasks to be used here
    grunt.loadNpmTasks( 'grunt-wp-i18n' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-compress' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    grunt.registerTask( 'default', [
        'minifycss', 'minifyjs', 'watch'
    ]);

    grunt.registerTask( 'dev', [
        'watch'
    ]);

    grunt.registerTask( 'minifycss', [
        'cssmin'
    ]);

    grunt.registerTask( 'minifyjs', [
        'uglify'
    ]);

    grunt.registerTask('release', [
        'makepot',
    ]);

    grunt.registerTask( 'textdomain', [
        'addtextdomain'
    ]);

    grunt.registerTask( 'cleanit', [
        'clean'
    ]);

    grunt.registerTask( 'zip', [
        'clean',
        'uglify',
        'cssmin',
        'copy',
        'compress'
    ])
};