<template>
  <div id="homePage">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup lang="ts">
const msg = "欢迎来到哈基米用户中心，你将从这里开始项目学习之旅~";
</script>

<style scoped>
#homePage {
  text-align: center;
  padding: 40px 0;
}
</style>
