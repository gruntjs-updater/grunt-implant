/*
 * grunt-implant
 * https://github.com/alistair/grunt-implant
 *
 * Copyright (c) 2015 Alistair MacDonald
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['dest']
    },

    implant: {
      'basic-config': {
        files: {
          'dest/basic-config.html': ['test/fixtures/basic-config.html']
        },
        options: {
          target: {
            'javascript': {
              wrap: '<script src="{{implant}}" type="text/javascript"></script>\n',
              implant: [
                'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.min.js',
                'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-animate.js',
                'http://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.min.js',
              ],
            },
          }
        }
      },

      'no-wrap': {
        files: {
          'dest/no-wrap.html': ['test/fixtures/no-wrap.html']
        },
        options: {
          target: {
            'no-wrap': {
              implant: [
                'A',
                'B',
                'C',
              ],
            },
          }
        }
      },

      'file-config': {
        files: {
          'dest/file-config.html': ['test/fixtures/file-config.html']
        },
        options: {
          target: {
            'file-config': {
              implant: [
                { file: 'test/fixtures/hello-world.txt' },
              ],
            },
          }
        }
      },

    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'implant', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
