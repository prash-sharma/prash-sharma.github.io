// Copy and paste research mds to destination dir

const fs = require('fs')
const path = require('path')

const researchCopyModule = (destDir, item, repoDirPath) => {
    if (fs.existsSync(`${repoDirPath}/doc/research`)) {
        if (!fs.existsSync(`${destDir}/${item}/research`)) {
            fs.mkdirSync(`${destDir}/${item}/research`)
            console.log(`${item}/research dir successfully created`)
        } else {
            console.log(`${item}/research dir already exists`)
        }

        const destResearchDirPath = path.resolve(`${destDir}/${item}/research`)

        if (fs.existsSync(repoDirPath)) {
            const researchDirPath = path.join(repoDirPath, 'doc/research')

            if (fs.existsSync(researchDirPath)) {
                const researchDir = fs.readdirSync(researchDirPath)

                if (researchDir.length > 0) {
                    researchDir.map((item) => {
                        const researchPath = path.join(researchDirPath, item)
                        const destResearchFilePath = path.join(
                            destResearchDirPath,
                            item
                        )

                        fs.copyFileSync(researchPath, destResearchFilePath)
                    })
                } else {
                    console.log('Research dir is empty')
                }
            }
        } else {
            console.log('No repos found')
            return
        }
    } else {
        console.log(`Research dir not found in the ${item} repo`)
    }

    console.log(`-------------`)
}

module.exports = researchCopyModule
