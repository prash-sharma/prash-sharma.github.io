const fs = require('fs')
const path = require('path')

const filesDir = '../SDKs'

const destDir = '../../docusaurus/my-website/docs/adr1'

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
        console.log(
            `No changes made for ${item}. File with 'id' already exists in dest folder.`
        )
    }
})
