<template>
  <van-nav-bar
    title="标题"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  >
    <template #right>
      <van-popover
        v-model:show="showPopover"
        theme="dark"
        :actions="actions"
        placement="bottom-end"
        :show-arrow="false"
        @select="onSelect"
      >
        <template #reference>
          <van-icon name="wap-nav" />
        </template>
      </van-popover>
    </template>
  </van-nav-bar>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const onClickLeft = () => history.back();
const showPopover = ref(false);
const router = useRouter();
const actions = [
  { text: "首页", path: "/" },
  { text: "我的订单", path: "/orderList" },
  { text: "我的地址", path: "/addressList" },
];
let onSelect = (item) => {
  router.replace(item.path);
};
</script>

<style scoped></style>
