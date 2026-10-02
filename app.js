const http = require('node:http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world from dev-container!\n');
});

server.listen(PORT, () => console.log(`App running on port ${PORT}`));