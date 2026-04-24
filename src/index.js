const express = require('express');
const app = express();
 
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || '1.0.0';
 
app.get('/health', (req, res) => {
  res.json({
    status:  'ok',
    version: VERSION,
    message: 'Welcome onboard. Greg API is live on AWS ECS!',
    host:    require('os').hostname(),   // shows the container ID
  });
});
 
app.get('/', (req, res) => {
  res.send('<h1>Borderless Tech Academy API</h1><p>GET /health for status</p>');
});
 
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
