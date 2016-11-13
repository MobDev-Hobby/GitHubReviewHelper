#!/bin/bash

(
	echo "var available_extensions=[";
	ls bower_components/file-icons/16px/|
		sed -r 's/(.*).png/"\1",/g'|
		tr -d '\n'|
		sed -r 's/,$//g'; 
	echo "];"
)|tr -d "\n">src/available_extensions.js
