/*
  Grunt Build version 1.
  Version 1.5 will include: Github, FTP, Database Backup, Proxy Server, Css Lint
*/
module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    clean: {
      assets: 'assets'
    },
    jshint: {
      options: {
        jshintrc: true
      },
      all: ['js/*.js']
    },
    concat: {
      dist: {
        src: ['js/*.js'],
        dest: 'assets/js/scripts.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'assets/css/main.css': 'assets/sass/main.scss'
        }
      }
    },
    watch: {
      sass: {
        files: ['assets/sass/main.scss','assets/sass/**/*.scss'],
        tasks: ['sass']
      },
      build: {
        files: ['js/*.js'],
        tasks: ['jshint', 'browserify', 'uglify']
      },
    },
    uglify: {
      player: {
        options: {
          sourceMap: true
        },
        files: {
          'assets/js/scripts.min.js': ['assets/js/scripts.js']
        }
      }
    },
    deployments: {
      options: {
        // any should be defined options here
      },
      // "Local" target
      "local": {
        "title": "Local",
        "database": "btshh",
        "user": "root",
        "pass": "root",
        "host": "localhost",
        "url": "http://localhost:8888/BTSHH/Website"
        // note that the `local` target does not have an "ssh_host"
      },
      // "Remote" targets
      "stage": {
        "title": "Stage",
        "database": "btshh",
        "user": "btshh",
        "pass": "Icekr3am714!",
        "host": "localhost",
        "url": "http://staging.btshiphop.com",
        "ssh_host": "slaymafia@btshiphop.com"
      }
      /*"production": {
        "title": "Production",
        "database": "production_db_name",
        "user": "production_db_username",
        "pass": "production_db_password",
        "host": "production_db_host",
        "url": "production_db_url",
        "ssh_host": "ssh_user@ssh_host"
      }*/
    }
  });

// load NPM tasks individually
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-deployments');

  // Register tasks
  grunt.registerTask('default', [
    'dev',
    'build'
  ]);
  grunt.registerTask('dev', [
    'jshint',
     'sass'
  ]);
  grunt.registerTask('build', [
    'concat',
    'uglify'
  ]);
  /*grunt.registerTask('local', [
    'deployments:local'
  ]);
  grunt.registerTask('stage', [
    'stage'
  ]);*/
  grunt.task.run([
    'dev',
    'watch'
  ]);
};
