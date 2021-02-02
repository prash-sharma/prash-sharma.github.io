const fs = require('fs')
const path = require('path')
const copyAdrs = require('./adrCopyModule')
const copyImages = require('./imageCopyModule')
const copyResearchDocs = require('./researchCopyModule')
const sidebarUpdateModule = require('./sidebarUpdateModule')

const destDir = '../docusaurus/my-website/docs'

const reposDirPath = '../repos'

if (fs.existsSync(reposDirPath)) {
    const reposDir = fs.readdirSync(reposDirPath)
    // console.log(reposDir)

    if (reposDir.length > 0) {
        reposDir.map((item) => {
            const repoDirPath = path.join(reposDirPath, item)
            // console.log(item)
            console.log(repoDirPath)

            if (!fs.existsSync(`${destDir}/${item}`)) {
                fs.mkdirSync(`${destDir}/${item}`)
                console.log(`${item} dir successfully created`)
            } else {
                console.log(`${item} dir already exists`)
            }

            copyAdrs(destDir, item, repoDirPath)
            copyImages(destDir, item, repoDirPath)
            copyResearchDocs(destDir, item, repoDirPath)
        })
    } else {
        console.log('Repos dir is empty.')
        return
    }
} else {
    console.log('repos folder does not exist.')
}

sidebarUpdateModule()
