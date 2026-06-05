import { defineStore } from "pinia";
import { ref } from "vue";
import { getCurrentUser, CurrentUser } from "@/api/user";

/**
 * 登录用户全局状态
 * 任何组件都能通过 useLoginUserStore() 读取/更新当前登录用户
 */
export const useLoginUserStore = defineStore("loginUser", () => {
  // 默认是“未登录”状态
  const loginUser = ref<CurrentUser>({
    id: 0,
    username: "未登录",
  });

  // 直接设置登录用户
  function setLoginUser(newLoginUser: CurrentUser) {
    loginUser.value = newLoginUser;
  }

  // 远程获取当前登录用户信息
  async function fetchLoginUser() {
    const res = await getCurrentUser();
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
    }
  }

  return { loginUser, setLoginUser, fetchLoginUser };
});
