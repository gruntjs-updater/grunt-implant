/*
 * grunt-implant
 * https://github.com/alistair/grunt-implant
 *
 * Copyright (c) 2015 Alistair MacDonald
 * Licensed under the MIT license.
 */


'use strict';

var cheerio = require('cheerio')
  , http = require('http')
  , fs = require('fs')
  ;


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerMultiTask('implant', 'Implant once source inside another. Eg: replace parts of an HTML or JavaScript file.', function() {

    var target = this.target;

    // Reference options
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });


    // Iterate over all specified fi groups.
    this.files.forEach(function (f) {

      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));



      function wrap (implant, wrapper) {
        var parts = wrapper.split('{{implant}}'),
          output = '';

        implant.forEach(function (implant) {
          output += parts[0] + implant + parts[1];
        });

        return output;
      }



      function build (target) {

        if (target.wrap) {
          return wrap(target.implant, target.wrap);
        }

        return target.implant.join();
      }



      // Filter HTML files in the Grunt files list
      function filter (obj) {

        obj.node.children.forEach(function (child) {


          if (child.type === 'comment'){

            var tagIdentifier = child.data.slice(0, child.data.indexOf(':')),
              targetName = child.data.slice(child.data.lastIndexOf(':')+1);

            // Scan an HTML file for comment nodes that contain "implant"
            // and a target name for the grunt task.
            // Eg: <!--implant:target-name-->

            // When found...
            if (tagIdentifier === 'implant' && targetName === obj.target.name) {

              // Build new HTML implant
              var implant = build(obj.target);

              // Write new block into DOM and notify
              obj.$(child).replaceWith(implant);

              grunt.log.ok('Write: \'' + obj.target.name + '\' comment written to: \'' + obj.dest + '\'');
            }
          }

          // If this node has children, recursively filter
          if (child.hasOwnProperty('children')){
            filter({
              $: obj.$,
              dest: obj.dest,
              node: child,
              target: obj.target,
            });
          }

        });

      }



      function compileTarget (target, src) {
        // Load the HTML file into Cheerio DOM parser
        var $ = cheerio.load(src);

        // Scan the DOM for places to switch CDN/Local resources
        filter({
          $: $,
          dest: f.dest,
          node: $._root,
          target: target
        });

        // Flatten the DOM back to a string
        src = $.html();

        return src;
      }



      // For each block in the target...
      for (var targetName in options.target){

        var target = options.target[targetName];
        target.name = targetName;

        var compiledSrc = compileTarget(target, src);

        grunt.file.write(f.dest, compiledSrc);
      }


      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');


    });

  });

};