module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dustjspkg: grunt.file.readJSON('node_modules/dustjs-linkedin/package.json'),
    copy: {
    	main: {
		    files: [
		      {src: ['node_modules/dustjs-linkedin/dist/dust-core-<%= dustjspkg.version %>.js'], dest: 'public/js/lib/dust-core-<%= dustjspkg.version %>.js'}
		    ]
		}
    },
    clean: ['public/js/lib/dust-core-*.js', 'public/js/src/templates.js', 'public/js/main.js', 'public/css/main.css'],
    dustjs: {
    	compile: {
    		files: {
    			'public/js/src/templates.js': ['views/**/*.dust']
    		}
    	}
    },   
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy hh:mm:ss") %> */\n'
      },
      dist: {
        files: {
          'public/js/main.js': ['public/js/lib/**/*.js', 'public/js/src/**/*.js']
        }
      }
    },
    stylus: {
    	compile: {
    		options: {
	    		paths: ['public/css'],
	    		use: [ require('nib') ],
	    	},
	    	files: {
	    		'public/css/main.css': ['public/css/**/*.styl']
	    	}
    	}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-dustjs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.registerTask('test', []);

  grunt.registerTask('default', ['clean', 'copy', 'dustjs', 'uglify', 'stylus']);

};