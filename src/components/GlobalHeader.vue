<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <div class="title-bar">
          <img class="logo" src="../assets/logo.png" alt="logo" />
          <div class="title">哈基米用户中心</div>
        </div>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="200px">
        <div class="user-login-status">
          <!-- 未登录状态：显示登录按钮 -->
          <a-button v-if="!isLogin" type="primary" href="/user/login">
            登录
          </a-button>
          <!-- 已登录状态：显示用户信息和退出按钮 -->
          <div v-else class="user-info">
            <a-space>
              <span class="user-account">{{
                loginUserStore.loginUser.userAccount
              }}</span>
              <a-tag
                :color="
                  loginUserStore.loginUser.userRole === 1 ? 'red' : 'blue'
                "
              >
                {{ userRoleText }}
              </a-tag>
              <a-button type="link" danger @click="handleLogout">
                <template #icon>
                  <logout-outlined />
                </template>
                退出
              </a-button>
            </a-space>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { computed, h, ref } from "vue";
import {
  CrownOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { MenuProps, message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useLoginUserStore } from "@/store/useLoginUserStore";
import { userLogout } from "@/api/user";

const router = useRouter();
const loginUserStore = useLoginUserStore();

const current = ref<string[]>([]);

// 判断是否已登录（id > 0 表示已登录）
const isLogin = computed(() => {
  return loginUserStore.loginUser.id > 0;
});

// 获取用户权限文本
const userRoleText = computed(() => {
  const role = loginUserStore.loginUser.userRole;
  return role === 1 ? "管理员" : "普通用户";
});

// 退出登录
const handleLogout = async () => {
  try {
    const res = await userLogout();
    if (res.data.code === 0) {
      message.success("退出成功");
      // 清空登录状态
      loginUserStore.setLoginUser({
        id: 0,
        username: "未登录",
      });
      // 跳转到登录页
      router.push("/user/login");
    } else {
      message.error("退出失败：" + res.data.message);
    }
  } catch (error) {
    message.error("退出失败，请重试");
  }
};

// 监听路由变化，更新当前选中菜单
router.afterEach((to) => {
  current.value = [to.path];
});

const doMenuClick = ({ key }: { key: string }) => {
  router.push({ path: key });
};
const items = ref<MenuProps["items"]>([
  {
    key: "/",
    icon: () => h(HomeOutlined),
    label: "主页",
    title: "主页",
  },
  {
    key: "/user/login",
    label: "用户登录",
    title: "用户登录",
  },
  {
    key: "/user/register",
    label: "用户注册",
    title: "用户注册",
  },
  {
    key: "/admin/userManage",
    icon: () => h(CrownOutlined),
    label: "用户管理",
    title: "用户管理",
  },
  {
    key: "others",
    label: h(
      "a",
      { href: "https://www.bilibili.com", target: "_blank" },
      "哔哩哔哩"
    ),
    title: "哔哩哔哩",
  },
]);
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}

.logo {
  height: 48px;
}

.user-login-status {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-account {
  font-weight: 500;
  color: #333;
}
</style>
