const express = require('express');
const app = express();
// 從環境變數 INSTANCE_ID 讀取伺服器名稱，例如 'Server-A'
const instanceId = process.env.INSTANCE_ID || 'Unknown Instance';
const port = 8080;

app.get('/', (req, res) => {
  const message = `Hello from **${instanceId}**! The time is ${new Date().toLocaleTimeString()}.`;
  console.log(`[LOG] Request served by ${instanceId}`); // 紀錄到容器日誌
  res.status(200).send(message);
});

app.listen(port, () => {
  console.log(`${instanceId} listening on port ${port}`);
});