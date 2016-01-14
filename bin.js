#!/usr/bin/env node

require('./')(process.cwd(), function(err) {
	console.log(err)
})