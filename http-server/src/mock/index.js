const url = require('url');

module.exports = function (path, req, res) {
  //   console.log(req);
  const { method } = req;

  if (method === 'GET') {
    const query = url.parse(req.url, true).query;
    console.log(query);
    res.end('get');
    return true;
  }

  if (method === 'POST') {
    res.end('post');
    return true;
  }

  if (method === 'PUT') {
    res.end('put');
    return true;
  }

  if (method === 'DELETE') {
    res.end('delete');
    return true;
  }

  return false;
};
