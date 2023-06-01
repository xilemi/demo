<template>
  <van-nav-bar :title="props.title">
    <!-- template 左边插槽 自定义内容 
    slot 插槽内再自定义插槽传入的内容
     -->
    <template #left>
      <slot v-if="back">
        <div @click="router.go(-1)">
          <van-icon name="arrow-left" />
          <span>返回</span>
        </div>
      </slot>
    </template>

    <template #right>
      <van-popover
        v-model:show="showPopover"
        theme="dark"
        :actions="actions"
        placement="bottom-end"
        :show-arrow="true"
        @select="onSelect"
      >
        <template #reference>
          <van-icon name="weapp-nav" />
        </template>
      </van-popover>
    </template>
  </van-nav-bar>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const showPopover = ref(false);
const router = useRouter();
const route = useRoute();
// 存在问题
const actions = [
  { text: "首页", path: "/", disabled: route.path == "/" },
  { text: "登录", path: "/login", disabled: route.path == "/login" },
  { text: "购物车", path: "/car", disabled: route.path == "/car" },
  {
    text: "我的订单",
    path: "/orderList",
    disabled: route.path == "/orderList",
  },
  {
    text: "我的地址",
    path: "/addressList",
    disabled: route.path == "/addressList",
  },
];
let props = defineProps({
  title: String,
  back: {
    type: Boolean,
    default: true,
  },
});
let onSelect = (item) => {
  router.replace(item.path);
};
</script>

<style scoped></style>
