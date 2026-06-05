const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // 前端开发服务器配置
  devServer: {
    // 后端默认占用 8080，这里改成 8000 避免端口冲突
    port: 8000,
    proxy: {
      // 以 /api 开头的请求，转发到后端 http://localhost:8080
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
