const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const url = require('url');
const { createReadStream, createWriteStream, readFileSync } = require('fs');
const mime = require('mime');
const ejs = require('ejs');
const mock = require('./mock');
const zlib = require('zlib');

class Server {
  constructor(options) {
    console.log('options:', options);
    const { port, directory, cache, gzip } = options;
    this.port = port;
    this.directory = directory;
    this.cache = cache;
    this.gzip = gzip;
    this.template = readFileSync(
      path.join(__dirname, '../template.html'),
      'utf-8'
    );

    this.start();
  }

  start() {
    this.server = http.createServer(this.handleRequest);
    this.server.listen(this.port, () => {
      console.log(`在${chalk.green(this.port)}端口启动了server`);
      const net = os.networkInterfaces();
      const localhost = net.lo0.filter((n) => n.family === 'IPv4')[0].address;
      const juyuNet = net.en0.filter((n) => n.family === 'IPv4')[0].address;
      console.log(chalk.yellow(`你可以在以下地址访问:`));
      console.log(chalk.green('http://' + localhost + ':' + this.port));
      console.log(chalk.green('http://' + juyuNet + ':' + this.port));
    });
  }

  sendFile(pathname, req, res) {
    res.setHeader(
      'Content-Type',
      mime.getType(pathname) || 'text/plain' + ';charset=utf-8'
    );
    if (this.gzip) { 
      const gzip = zlib.createGzip();
      gzip.pipe(res);
      createReadStream(pathname).pipe(transfrom) pipe(res);
    }
    createReadStream(pathname).pipe(res);
  }
  async sendDir(pathname, req, res) {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    let files = await fs.readdir(pathname);
    files = files.map((file) => {
      return {
        url: path.join(req.pathname, file),
        name: file,
      };
    });
    let result = ejs.render(this.template, { files });
    res.write(result);
    res.end();
  }

  sendError(err, req, res) {
    res.statusCode = 404;
    res.end('Not Found');
  }

  async processAssets(pathname, req, res) {
    const path_ = path.join(__dirname, pathname);
    try {
      const stat = await fs.stat(path_);
      const isFile = !stat.isDirectory();

      if (isFile) {
        this.sendFile(path_, req, res);
      } else {
        this.sendDir(path_, req, res);
      }
    } catch (error) {
      this.sendError(error, req, res);
    }
  }

  handleRequest = async (req, res) => {
    const pathname = url.parse(req.url, true).pathname;
    req.pathname = pathname;
    // const result = await mock(pathname, req, res);
    // if (result) return;
    await this.processAssets(pathname, req, res);
  };
}

module.exports = function createServer(options) {
  return new Server(options);
};
