const fs = require('fs')
const path = require('path')

const sidebarUpdateModule = () => {
    const destDir = '../docusaurus/my-website/sidebars.js'

    const reposDirPath = '../docusaurus/my-website/docs'

    fs.writeFileSync(
        destDir,
        `module.exports = {\n ADR: [
    'adr', `
    )

    if (fs.existsSync(reposDirPath)) {
        const reposDir = fs.readdirSync(reposDirPath)

        reposDir.map((item) => {
            const adrDirPath = path.resolve(`${reposDirPath}/${item}/adr`)

            if (fs.existsSync(adrDirPath)) {
                const repos = fs.readdirSync(adrDirPath)
                console.log(repos)

                fs.appendFileSync(
                    destDir,
                    `{
                    type: 'category',
                    label: '${item}',
                    items: [`
                )
                repos.map((files) => {
                    const id = path.basename(files, path.extname(files))
                    console.log(files)

                    const fileId = id.substring(id.indexOf('_') + 1)

                    fs.appendFileSync(destDir, `'${item}/adr/${fileId}',`)
                })
                fs.appendFileSync(destDir, `],},`)
            } else {
                console.log(`No adr found in ${item} folder`)
            }
        })
    } else {
        console.log('repos folder does not exist.')
    }

    fs.appendFileSync(destDir, `],}`)
}

module.exports = sidebarUpdateModule
