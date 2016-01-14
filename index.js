const fs = require('fs')
const path = require('path')

function rmNpm( p ) {
	if( !fs.existsSync( p ) ) return
	fs.readdir( p, function ( err, dirs ) {
		if( err ) console.log( err )
		const canIDeleteNodeModules = checkPackageJson( dirs )
		const canIDeleteBowerComponents = checkBowerJson( dirs )
		dirs.forEach( function( dir ){
			const pathname = path.join( p, dir )
			if ( fs.statSync( pathname ).isDirectory() && !/^\$/.test( dir ) && !/^\./.test( dir ) ) {
				if( /node_modules/.test( dir ) && canIDeleteNodeModules) {
					//delete node_modules directory
					deleteFolderRecursive( pathname )
				}
				if(/bower_components/.test( dir ) && canIDeleteBowerComponents ) {
					// delete bower_components directory
					deleteFolderRecursive( pathname )
				}
				rmNpm( pathname )
			}
		})
		
	})
}

function checkPackageJson( names ) {
	return names.some( function ( name ) {
		return /package\.json/.test( name )
	})
}

function checkBowerJson ( names ) {
	return names.some( function ( name ) {
		return /bower\.json/.test( name )
	})
}

function deleteFolderRecursive ( p ) {
	var files = []
	if( fs.existsSync( p ) ) {
		files = fs.readdirSync( p )
		files.forEach( function ( file, index ) {
			const curPath = p + '/' + file
			if(fs.statSync( curPath ).isDirectory() ){
				deleteFolderRecursive( curPath )
			} else {
				fs.unlinkSync( curPath )
			}
		})
		fs.rmdirSync( p )
	}
}

module.exports = rmNpm





