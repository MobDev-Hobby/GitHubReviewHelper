module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-data-uri');
	grunt.loadNpmTasks('grunt-webext-builder');

	grunt.initConfig({
		"webext_builder":{
			"chrome": {
				"privateKey": ".private.pem",
				"targets": [
					"chrome-crx"
				],
				"files": {
					"dest":["build"]
				}
			},
			"firefox": {
				"jwtIssuer": process.env.jwtIssuer,
				"jwtSecret": process.env.jwtSecret,
				"targets": [
					"firefox-xpi"
				],
				"files": {
					"dest":["build"]
				}
			}
		},
		"bower_concat": {
			"all": {
				"dest": {
					"js": "build/content_script.js",
					"css": "build/content_script.css",
				},
				"mainFiles": {
					"file-icons": ["*"]
				},
				"bowerOptions": {
				  "relative": false
				},
			},
		},
		"concat": {
			"build/content_script.js":[ 
				"build/content_script.js",
				"src/*.js"
			],
			"build/content_script.css":[ 
				"build/content_script.css",
				"src/*.css"
			],
			"build/manifest.json": "src/manifest.json"
		},
		"cssmin": {
			"build/content_script.css":"build/content_script.css"
		},
		"uglify": {
			"build/content_script.js":"build/content_script.js"
		},
		"copy": {
			"build":{
				"files": [
					{
						"expand": true, 
						"cwd": 'bower_components/file-icons/16px/',
						"src": ['**/*.png'], 
						"dest": 'build/icons/'
					}
				]
			}
		},
		"dataUri": {
			"dist":{
				"src":["build/content_script.css"],
				"dest":"build/",
				"options":{
					"target":["bower_components/jstree/src/themes/default/*.*"],
					"fixDirLevel": true,
					"baseDir":"bower_components/jstree/src/themes/default/"
				}
			}
		}
	});

	grunt.registerTask('default', ['bower_concat', 'concat', 'dataUri', 'cssmin', 'uglify', 'copy']);
	grunt.registerTask('pack', ['default', 'webext_builder']);
};
