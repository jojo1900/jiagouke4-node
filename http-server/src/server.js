const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const chalk = require('chalk');

class Server {
  constructor(options) {
    const { port, directory, cache, gzip } = options;
    this.port = port;
    this.directory = directory;
    this.cache = cache;
    this.gzip = gzip;
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

  handleRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.write('哈哈哈哈看看乱不乱码\r\n');
    res.end('再见👋');
  };
}

module.exports = function createServe(options) {
  return new Server(options);
};
