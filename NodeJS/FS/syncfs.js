/* SYNC FS */

const fs = require('fs')

// Create a folder
fs.mkdir('Challenge1', () => {
    return
})

// Add a file into a folder
fs.writeFileSync(
    'Challenge1/file1.md',
    'This is an example data for challenge 1'
)

// Rename a file
fs.renameSync('Challenge1/file1.md', 'Challenge1/fileA.md')
// Add content to a file
fs.appendFileSync('Challenge1/fileA.md', ' Some additional data...')

// Read content of a file
const data = fs.readFileSync('Challenge1/fileA.md', 'utf-8')

console.log(data)

// Remove a file in a folder
fs.unlinkSync('Challenge1/fileA.md')

// Remove a folder
fs.rmdirSync('Challenge1')
