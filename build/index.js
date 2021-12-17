const path = require('path')
const fs = require('fs-extra')
const babel = require('@babel/core')
const UglifyJS = require('uglify-js')
const babelConfig = {
    configFile: path.join(__dirname, '../babel.config.js')
}

const srcPath = path.join(__dirname, '../packages');
const scriptRegExp = /\.(js|ts|tsx)$/
const isScript = path => scriptRegExp.test(path)
const isDir = dir => fs.lstatSync(dir).isDirectory()
function compilerJs(dir) {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
        if (file == '.DS_Store') return
        const filePath = path.join(dir, file)
        const fileLibPath = filePath.replace('/packages/', '/dist/')
        if (isDir(filePath)) {
            return compilerJs(filePath)
        }
        if (isScript(filePath)) {
            let { code } = babel.transformFileSync(filePath, babelConfig)
            const result = UglifyJS.minify(code)
            if (result.error) {
                throw result.error
            }
            fs.outputFileSync(fileLibPath.replace(scriptRegExp, '.js'), result.code)
        }
    })
}
compilerJs(srcPath)
