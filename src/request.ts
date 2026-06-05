import axios from "axios";

/**
 * 全局 axios 实例
 * baseURL 为 /api，配合 vue.config.js 的代理转发到后端
 * withCredentials 开启后会带上 cookie，后端 Session 鉴权依赖它
 */
const myAxios = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
});

// 响应拦截器：统一处理后端返回（这里先做最基础的处理）
myAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default myAxios;
