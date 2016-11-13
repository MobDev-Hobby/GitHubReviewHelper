build:
	npm install
	bower install
	grunt
rebuild:
	grunt
clean:
	rm -rf node_modules
	rm -rf bower_components
	rm -rf build
update:
	npm update
	bower update
	grunt
gen_extension_list:
	npm install
	bower install
	src/scripts/generate_extension_list.sh
