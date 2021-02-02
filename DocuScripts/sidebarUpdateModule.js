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

        // console.log(reposDir)

        reposDir.map((item) => {
            // console.log(item)
            // console.log(path.resolve(`${item}/adr`))

            const adrDirPath = path.resolve(`${reposDirPath}/${item}/adr`)

            // console.log(fs.readdirSync(adrDirPath))

            if (fs.existsSync(adrDirPath)) {
                // console.log(adrDirPath)
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
                    // const id = path.basename(files)
                    // console.log(`${id.substring(id.indexOf('_') + 1)}`)
                    console.log(files)

                    const fileId = id.substring(id.indexOf('_') + 1)

                    fs.appendFileSync(destDir, `'${item}/adr/${fileId}',`)
                })
                fs.appendFileSync(destDir, `],},`)

                // console.log(id)
                // console.log(repos)
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
