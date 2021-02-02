// Copy, update and paste adr mds to destination dir

const fs = require('fs')
const path = require('path')

const adrCopyModule = (destDir, item, repoDirPath) => {
    if (!fs.existsSync(`${destDir}/${item}/adr`)) {
        fs.mkdirSync(`${destDir}/${item}/adr`)
        console.log(`${item}/adr dir successfully created`)
    } else {
        console.log(`${item}/adr dir already exists`)
    }

    const destAdrDirPath = path.resolve(`${destDir}/${item}/adr`)

    if (fs.existsSync(repoDirPath)) {
        const adrDirPath = path.join(repoDirPath, 'doc/adr')

        if (fs.existsSync(adrDirPath)) {
            const adrDir = fs.readdirSync(adrDirPath)

            if (adrDir.length > 0) {
                adrDir.map((item) => {
                    const adrPath = path.join(adrDirPath, item)
                    const destAdrFilePath = path.join(destAdrDirPath, item)

                    fs.copyFileSync(adrPath, destAdrFilePath)

                    const origAdrContent = fs.readFileSync(
                        destAdrFilePath,
                        'utf-8'
                    )

                    const id = path.basename(
                        destAdrFilePath,
                        path.extname(destAdrFilePath)
                    )

                    fs.writeFileSync(
                        destAdrFilePath,
                        `---\nid: "${id.substring(
                            id.indexOf('_') + 1
                        )}"\nhide_title: true\n---\n\n`
                    )

                    fs.appendFileSync(destAdrFilePath, origAdrContent)
                })
            } else {
                console.log('ADR dir is empty')
            }
        } else {
            console.log('No ADR dir found')
            console.log('------------')
        }
    } else {
        console.log('No repos found')
    }
}

module.exports = adrCopyModule
