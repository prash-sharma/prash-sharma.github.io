const path = require('path')
const { execSync } = require('child_process')

execSync('https://github.com/deltatre-vxp/mtribes-fire.git', {
    stdio: [0, 1, 2], // we need this so node will print the command output
    cwd: path.resolve(__dirname, './GitHubRepos/repos'), // path to where you want to save the file
})
