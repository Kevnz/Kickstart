var heredoc = require('heredoc');

var gruntFile = heredoc(function () {/*
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                  {src: ['img/*'], dest: 'public/', filter: 'isFile'}, // includes files in path
                ]
            }
        },
        watch: {
            files: ['public/js/*', 'public/js/**.js','sass/*.scss', 'app.js','lib/*', 'views/*.jade'],
            tasks: [ 'jshint', 'compass', 'yuiConfig','config-copy', 'copy'],
            options: {
                livereload: true,
            }
        },
        jshint: {
            options: {
                expr: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: false,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    YUI: true,
                    console: true,
                    exports: true,
                    require: true
                },
 
                    ignores: ['public/js/lib/*.js']
            
            }, 
            lib_test: {
                src: ['public/js/**.js','lib/*.js', 'routes/*.js']
            }
        },
        yuiConfig: {
            losing: {
                options: {
                    dest: 'public/yui_config.js',
                    root: '/yui/build/',
                    combine: true, 
                    comboBase: 'http://localhost:3000/combo?', 
                    groups: {
                        losingApp: {
                            combine: true,  
                            root: '',
                            modules: ['public/js/**.js'],
                            processPath: function (p) {
                                return p.replace('public', '');
                            },
                            excludeFiles: ['public/js/lib/**.js']
                        }
                    }
                }
            }
        },
        compass: {
            dist: {
                options: {
                config: 'config.rb'
                }
            }
        }
    });
 

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-yui-config');
    grunt.loadNpmTasks('grunt-contrib-compass'); 
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default',  ['jshint','compass','yuiConfig','config-copy','copy']);
 
};
*/});

exports.grunt = gruntFile;