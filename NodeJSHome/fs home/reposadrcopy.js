const fs = require('fs')
const path = require('path')

// const filesDir = '../SDKs'

const destDir = '../../docusaurus/my-website/docs/adr'

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir)
    console.log('ADR dir successfully created')
} else {
    console.log('Dir already exists')
}

const reposDirPath = '../../repos'

if (fs.existsSync(reposDirPath)) {
    const reposDir = fs.readdirSync(reposDirPath)
    // console.log(reposDir)

    if (reposDir.length > 0) {
        reposDir.map((item) => {
            const repoDirPath = path.join(reposDirPath, item)

            // console.log(item)
            console.log(repoDirPath)

            if (fs.existsSync(repoDirPath)) {
                const repoDir = fs.readdirSync(repoDirPath)
                // console.log(repoDir)

                const adrDirPath = path.join(repoDirPath, 'doc/adr')
                // console.log(adrDirPath)

                if (fs.existsSync(adrDirPath)) {
                    // console.log(adrDirPath)
                    const adrDir = fs.readdirSync(adrDirPath)
                    // console.log(adrDir)

                    if (adrDir.length > 0) {
                        adrDir.map((item) => {
                            // console.log(item)
                            const adrPath = path.join(adrDirPath, item)
                            console.log(adrPath)
                        })
                    } else {
                        console.log('ADR dir is empty')
                    }
                } else {
                    console.log('No ADR dir found')
                    return
                }
            } else {
                console.log('No repos found')
                return
            }

            console.log(`-------------`)
        })
    } else {
        console.log('Repos dir is empty.')
        return
    }
} else {
    console.log('Repos folder does not exist.')
}

// if (!fs.existsSync(destDir)) {
//     fs.mkdirSync(destDir, (err) => {
//         console.log(err)
//     })
// }

// const allFiles = fs.readdirSync(filesDir, 'utf-8', (err) => {
//     console.log(err)
// })

// allFiles.map((item) => {
//     // console.log(item)
//     const filePath = path.join(filesDir, item)
//     // console.log(filePath)
//     // console.log(path.basename(filePath, path.extname(filePath)))

//     const sourceData = fs.readFileSync(filePath, 'utf-8')

//     if (!fs.existsSync(path.join(destDir, item))) {
//         fs.writeFileSync(
//             filePath,
//             `---\nid: "${path.basename(
//                 filePath,
//                 path.extname(filePath)
//             )}"\n---\n`
//         )
//         fs.appendFileSync(filePath, sourceData)

//         // console.log(filePath)
//         fs.copyFileSync(filePath, path.join(destDir, item))
//     } else {
//         console.log(
//             `No changes made for ${item}. File with 'id' already exists in dest folder.`
//         )
//     }
// })
