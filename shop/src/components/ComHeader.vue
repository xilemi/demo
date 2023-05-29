<template>
  <van-nav-bar
    title="标题"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  >
  </van-nav-bar>
</template>
<script setup>
const onClickLeft = () => history.back();
</script>

<style scoped></style>
