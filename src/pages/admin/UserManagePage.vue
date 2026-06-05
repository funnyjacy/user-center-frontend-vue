<template>
  <div id="userManagePage">
    <h2 class="title">用户管理</h2>

    <!-- 搜索栏 -->
    <a-form layout="inline" :model="searchParams" @finish="doSearch">
      <a-form-item label="用户名">
        <a-input
          v-model:value="searchParams.username"
          placeholder="请输入用户名"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
      </a-form-item>
    </a-form>

    <!-- 用户表格 -->
    <a-table
      style="margin-top: 16px"
      :columns="columns"
      :data-source="data"
      :loading="loading"
      row-key="id"
    >
      <template #bodyCell="{ column, record }">
        <!-- 头像 -->
        <template v-if="column.dataIndex === 'avatarUrl'">
          <a-avatar v-if="record.avatarUrl" :src="record.avatarUrl" />
          <span v-else>无</span>
        </template>
        <!-- 性别 -->
        <template v-else-if="column.dataIndex === 'gender'">
          {{ genderText(record.gender) }}
        </template>
        <!-- 用户角色 -->
        <template v-else-if="column.dataIndex === 'userRole'">
          <a-tag :color="record.userRole === 1 ? 'green' : 'blue'">
            {{ record.userRole === 1 ? "管理员" : "普通用户" }}
          </a-tag>
        </template>
        <!-- 创建时间 -->
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ formatTime(record.createTime) }}
        </template>
        <!-- 操作 -->
        <template v-else-if="column.key === 'action'">
          <a-popconfirm
            title="确定要删除该用户吗？"
            ok-text="确定"
            cancel-text="取消"
            @confirm="doDelete(record.id)"
          >
            <a-button type="link" danger>删除</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { searchUsers, deleteUser, CurrentUser } from "@/api/user";

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "账号",
    dataIndex: "userAccount",
  },
  {
    title: "头像",
    dataIndex: "avatarUrl",
  },
  {
    title: "性别",
    dataIndex: "gender",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "用户角色",
    dataIndex: "userRole",
  },
  {
    title: "操作",
    key: "action",
  },
];

// 搜索参数
const searchParams = reactive({
  username: "",
});

// 表格数据
const data = ref<CurrentUser[]>([]);
const loading = ref(false);

/**
 * 获取用户列表
 */
const fetchData = async () => {
  loading.value = true;
  try {
    const res = await searchUsers(searchParams.username);
    if (res.data.code === 0 && res.data.data) {
      data.value = res.data.data;
    } else {
      message.error("获取数据失败，" + res.data.description);
    }
  } finally {
    loading.value = false;
  }
};

/**
 * 点击搜索
 */
const doSearch = () => {
  fetchData();
};

/**
 * 删除用户
 */
const doDelete = async (id: number) => {
  const res = await deleteUser(id);
  if (res.data.code === 0 && res.data.data) {
    message.success("删除成功");
    // 重新拉取列表
    fetchData();
  } else {
    message.error("删除失败，" + res.data.description);
  }
};

/**
 * 性别数字转文字
 */
const genderText = (gender?: number) => {
  if (gender === 1) return "男";
  if (gender === 0) return "女";
  return "未知";
};

/**
 * 格式化时间
 */
const formatTime = (time?: string) => {
  if (!time) return "-";
  return new Date(time).toLocaleString();
};

// 页面加载时获取一次数据
fetchData();
</script>

<style scoped>
#userManagePage {
  padding: 24px;
}

#userManagePage .title {
  margin-bottom: 24px;
}
</style>
