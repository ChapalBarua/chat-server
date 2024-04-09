const { WebSocketServer } = require('ws');
var https = require('https');
var fs = require('fs');
// var options = {
//   key: fs.readFileSync('helpers/secrets/certs/cert.key'),
//   cert: fs.readFileSync('helpers/secrets/certs/cert.crt')
// };

var options = {
  key: fs.readFileSync('/home/ec2-user/secrets/certs/cert.key'),
  cert: fs.readFileSync('/home/ec2-user/secrets/certs/cert.crt')
};

httpsServer = https.createServer(options).listen(3000);

const sockserver = new WebSocketServer({server: httpsServer});
sockserver.on('connection', ws => {
 console.log('New client connected!');
 ws.on('close', () => console.log('Client has disconnected!'));
 ws.on('message', data => {
   sockserver.clients.forEach(client => {
     console.log(`distributing message: ${data}`);
     client.send(`${data}`);
   })
 })
 ws.onerror = function () {
   console.log('websocket error');
 }
})
