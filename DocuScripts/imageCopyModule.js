// Copy and paste images to destination dir

const fs = require('fs')
const path = require('path')

const imageCopyModule = (destDir, item, repoDirPath) => {
    if (fs.existsSync(`${repoDirPath}/doc/images`)) {
        if (!fs.existsSync(`${destDir}/${item}/images`)) {
            fs.mkdirSync(`${destDir}/${item}/images`)
            console.log(`${item}/images dir successfully created`)
        } else {
            console.log(`${item}/images dir already exists`)
        }

        const destImagesDirPath = path.resolve(`${destDir}/${item}/images`)

        if (fs.existsSync(repoDirPath)) {
            const imagesDirPath = path.join(repoDirPath, 'doc/images')

            if (fs.existsSync(imagesDirPath)) {
                const imageDir = fs.readdirSync(imagesDirPath)

                if (imageDir.length > 0) {
                    imageDir.map((item) => {
                        const imagePath = path.join(imagesDirPath, item)
                        const destAdrImagePath = path.join(
                            destImagesDirPath,
                            item
                        )

                        fs.copyFileSync(imagePath, destAdrImagePath)
                    })
                } else {
                    console.log('No image copied, images dir is empty')
                }
            } else {
                console.log('No images dir found')
                console.log('---------')
                return
            }
        }
    } else {
        console.log(`Images dir not found in ${item} repo`)
        return
    }
}

module.exports = imageCopyModule
