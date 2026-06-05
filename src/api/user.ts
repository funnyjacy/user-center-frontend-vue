import myAxios from "@/request";

/**
 * 登录请求参数
 */
export interface UserLoginParams {
  userAccount: string;
  userPassword: string;
}

/**
 * 当前登录用户信息（与后端 User 实体对应，密码等敏感字段后端不会返回）
 */
export interface CurrentUser {
  id: number;
  username?: string;
  userAccount?: string;
  avatarUrl?: string;
  gender?: number;
  phone?: string;
  email?: string;
  userStatus?: number;
  userRole?: number;
  planetCode?: string;
  createTime?: string;
}

/**
 * 注册请求参数
 */
export interface UserRegisterParams {
  userAccount: string;
  userPassword: string;
  checkPassword: string;
  planetCode: string;
}

/**
 * 用户登录
 */
export const userLogin = async (params: UserLoginParams) => {
  return myAxios.post("/user/login", params);
};

/**
 * 用户注册
 */
export const userRegister = async (params: UserRegisterParams) => {
  return myAxios.post("/user/register", params);
};

/**
 * 获取当前登录用户
 */
export const getCurrentUser = async () => {
  return myAxios.get("/user/current");
};

/**
 * 用户注销
 */
export const userLogout = async () => {
  return myAxios.post("/user/logout");
};
