import { useLoginUserStore } from "@/store/useLoginUserStore";
import { message } from "ant-design-vue";
import router from "@/router";

/**
 * 全局权限校验
 */
router.beforeEach(async (to, _from, next) => {
  const loginUserStore = useLoginUserStore();
  const loginUser = loginUserStore.loginUser;
  const toUrl = to.fullPath;

  // 如果访问的是管理员页面
  if (toUrl.startsWith("/admin")) {
    // 检查用户是否登录且是否为管理员（userRole 为 1）
    if (!loginUser || loginUser.userRole !== 1) {
      message.error("没有权限");
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
  }

  // 放行
  next();
});
