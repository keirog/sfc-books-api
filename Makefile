install:
	npm install

test:
	mocha ./tests/*.spec.js

run:
	nodemon server/app.js
