# Dockerfile for backend server
# 選擇輕量級的 Node.js 基礎映像檔
FROM node:lts-slim
# 設定工作目錄
WORKDIR /app
# 複製 package.json 和 package-lock.json (如果存在)
COPY package*.json ./
# 安裝所有依賴
RUN npm install
# 複製應用程式程式碼
COPY . .
# 應用程式在容器內監聽 8080 端口
EXPOSE 8080
# 啟動應用程式
CMD ["node", "server.js"]