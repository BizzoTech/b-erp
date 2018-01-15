const http = require("http");
const httpProxy = require("http-proxy");

//
// Create a proxy server with custom application logic
//
const proxy = httpProxy.createProxyServer({});

const server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.

  console.log(req.url);

  try {

    if(req.url === "/"){
      res.writeHead(302, {'Location': 'http://localhost:5050/web'});
      res.end();
      return;
    }

    if (
      req.url.startsWith("/web") ||
      req.url.startsWith("/static") ||
      req.url.startsWith("/favicon") ||
      req.url.startsWith("/sockjs")
    ) {
      return proxy.web(req, res, {
        target: "http://127.0.0.1:3000"
      });
    }
  
    proxy.web(req, res, {
      target: "http://127.0.0.1:9090"
    });
  } catch (error) {
    console.log(error);
  }

  
});

//
// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
//
server.on('upgrade', function (req, socket, head) {
  try {
    proxy.ws(req, socket, head, {
      target: "http://127.0.0.1:3000"
    });
  } catch (error) {
    console.log(error)
  }
  
});

// Listen for the `error` event on `proxy`.
proxy.on('error', function (err, req, res) {
  res.statusCode = 500;

  res.end('Something went wrong. And we are reporting a custom error message.');
});



console.log("listening on port 5050");
server.listen(5050);
