const fs = require('fs')
// const { join } = require('path')
const path = require('path')

const filesDir = '../SampleMDs'

const destDir = '../../docusaurus/my-website/docs/adr'

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, (err) => {
        console.log(err)
    })
}

const allFiles = fs.readdirSync(filesDir, 'utf-8', (err) => {
    console.log(err)
})

allFiles.map((item) => {
    // console.log(item)
    const filePath = path.join(filesDir, item)
    // console.log(filePath)
    // console.log(path.basename(filePath, path.extname(filePath)))

    const sourceData = fs.readFileSync(filePath, 'utf-8')

    if (!fs.existsSync(path.join(destDir, item))) {
        fs.writeFileSync(
            filePath,
            `---\nid: "${path.basename(
                filePath,
                path.extname(filePath)
            )}"\n---\n`
        )
        fs.appendFileSync(filePath, sourceData)

        // console.log(filePath)
        fs.copyFileSync(filePath, path.join(destDir, item))
    } else {
        console.log('No changes made')
    }
})

// console.log(allFiles)

// /* Example */
// // Read and write
// const filePath = '../../example.md'
// const FileName = path.parse(filePath).name

// const SourceDirName = path.dirname('../SampleMDs')

// const copySourceDir = fs.readdirSync(SourceDirName, 'utf-8')

// const createDir = fs.mkdirSync(`../${copySourceDir}`)

// console.log(copySourceDir)

// // console.log(DirName[0]);

// const DirImport = fs.readdirSync('../SampleMDs', 'utf-8')

// // const DirWrite = fs.mkdirSync(DirImport, );

// // console.log();

// const SourceData = fs.readFileSync(filePath, 'utf-8', (err, data) => {
//     if (err) throw err

//     console.log(data)
//     return data
// })

// fs.writeFileSync(filePath, `---\nid: "${FileName}"\n---\n`, (err) => {
//     if (err) throw err
// })

// fs.appendFileSync(filePath, SourceData, (err, data) => {
//     if (err) throw err

//     console.log(data)
// })
