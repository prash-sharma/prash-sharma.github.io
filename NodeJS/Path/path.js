const path = require('path')

file = path.basename('NodeJSHome/SampleMDs/Android.md')
dir = path.dirname('NodeJSHome/SampleMDs/Android.md')
parse = path.parse('NodeJSHome/SampleMDs/Android.md')
resolve = path.resolve('NodeJSHome/SampleMDs/Android.md')

console.log(file) // Android.md
console.log(dir) // NodeJSHome/SampleMDs
console.log(parse.name) // Android
console.log(resolve) // /Users/prashanta.sharma/Desktop/Prashant/JS/prash-sharma.github.io/NodeJS/Path/NodeJSHome/SampleMDs/Android.md
