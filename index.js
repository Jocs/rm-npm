/**
 * create at 2016-01-14 by Jocs
 */
const fs = require('fs')
const path = require('path')

const rmNpm = function(rmPath, cb) {
	// if `rmPath` is not exist , return
	if (!fs.existsSync(rmPath)) return
	fs.readdir(rmPath, (err, dirs) => {
		if (err) return cb(err)
		const canIDeleteNodeModules = checkPackageJson(dirs)
		const canIDeleteBowerComponents = checkBowerJson(dirs)
		dirs.forEach(dir => {
			const pathname = path.join(rmPath, dir)
			if (fs.statSync(pathname).isDirectory() && !(/^\$/).test(dir) && !/^\./.test(dir)) {
				if ((/node_modules/.test(dir) && canIDeleteNodeModules) || (/bower_components/.test(dir) && canIDeleteBowerComponents)) {
					deleteFolderRecursive(pathname)
				}
				rmNpm(pathname)
			}
		})
	})
}

const checkPackageJson = names => names.some(name => /package\.json/.test(name))
const checkBowerJson = names => names.some(name => /bower\.json/.test(name))

const deleteFolderRecursive = p => {
	var files = []
	if (fs.existsSync(p)) {
		files = fs.readdirSync(p)
		files.forEach((file, index) => {
			const curPath = p + '/' + file
			if (fs.statSync(curPath).isDirectory()) {
				deleteFolderRecursive(curPath)
			} else {
				fs.unlinkSync(curPath)
			}
		})
		// 删除空文件夹
		fs.rmdirSync(p)
	}
}

module.exports = rmNpm

