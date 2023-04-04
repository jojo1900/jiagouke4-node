module.exports = {
  port: {
    option: '-p --port <port> ',
    description: '设置端口号',
    default: 3000,
    usage: 'yd-server -p 3000',
  },
  directory: {
    option: '-d --directory <dir>',
    description: '设置文件夹',
    default: process.cwd(),
    usage: 'yd-server -d <dir>',
  },
  cache: {
    option: '-c --cache <time>',
    description: '设置缓存时间',
    default: 3000,
    usage: 'yd-server -c 100000 ',
  },
  gzip: {
    option: '-g --gzip <number>',
    description: '是否压缩',
    default: 1,
    usage: 'yd-server -g 1',
  },
};
