const express = require('express');
const PORT = 80;
var http = require('http');
var https = require('https');
const path = require('path');

const app = express();

// redirect https to http
app.use(function avoidHTTPS(req, res, next) {
  if (req.secure) {
    return res.redirect('http://' + req.headers.host + req.url);
  }
  next();
});

//redirect www.chapalbarua.com to chapalbarua.com
app.use(function avoidWWW(req, res, next) {
  if(req.headers.host.startsWith('www.')){
    return res.redirect(req.headers.host.slice(4) + req.url);
  }
  next();
});


app.use(express.static(__dirname + '/dist/websocket-chat-app'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/dist/websocket-chat-app/index.html')));
https.createServer(options, app).listen(443);
http.createServer(app).listen(PORT, ()=>console.log(`Server is now listening on port ${PORT}`));