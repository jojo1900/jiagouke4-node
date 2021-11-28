module.exports = {
    "port": {
        flags: '-p, --port <p>',
        description: 'Port to use look for open port. [8080]',
        default: 3000,
        usage: 'zf-server --port 3000'
    },
    "directory": {
        flags: '-d, --directory <d>',
        description: 'Show directory listings [true]',
        default: process.cwd(),
        usage: 'zf-server --directory D:/'
    }
}

