module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		coffee:{},
		less:{},
		jshint: {},
		uglify:{
			options:{},
			build: {
				src: 'js/modal.jquery.js',
				dest: 'js/modal.jquery.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['uglify']);
}