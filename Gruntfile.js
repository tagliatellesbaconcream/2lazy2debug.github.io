module.exports = function(grunt) {

  var serveStatic = require('serve-static');


    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      watch: {
        options: {
          livereload: true
        },
        jade: {
          tasks: ["jade:debug"],
          files: ["**/*.jade", "**/*.md", "!source/templates/*.jade"]
        }
      },
      jade: {
        options: {
          pretty: true,
          files: {
            "*": ["**/*.jade", "!source/templates/*.jade"]
          }
        },
        debug: {
          options: {
            locals: {
              livereload: true
            }
          }
        },
        publish: {
          options: {
            locals: {
              livereload: false
            }
          }
        }
      },
      web: {
        options: {
          port: 8001
        }
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jade-tasks');
  
    grunt.registerTask('default', ['jade:debug', 'web']);
    grunt.registerTask('publish', ['jade:publish']);
  
    grunt.registerTask('web', 'Start web server...', function() {
      var options = this.options();
      var connect = require('connect');
      connect().use(
          serveStatic(__dirname)
      ).listen(options.port);
      console.log('http://localhost:%s', options.port);
  
      grunt.task.run(["watch:jade"]);
    });
  
  };