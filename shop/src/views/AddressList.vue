<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="selectHandler"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { addressListApi } from "@/api/address.js";
import { showFailToast } from "vant";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
let list = ref([]);
let User = useUserStore();
let { userid } = storeToRefs(User);
const chosenAddressId = ref(0);
const router = useRouter();
const route = useRoute();
const onEdit = (item) => {
  console.log(item);
  router.push({ path: "/addAddress", query: { info: JSON.stringify(item) } });
  // 跳转到 新增地址界面  做判断 如果是新增  初始化数据为空
  // 如果是编辑  会携带编辑的地址  转成 stringify传递过去
  // 保存按钮 两个功能  新增  修改保存
};
const onAdd = () => {
  router.push("/addAddress");
};

const selectHandler = (item) => {
  let returnUrl = route.query.returnUrl;
  // 将姓名电话  详细地址传递回去
  // 一定地调转回订单详细页面吗
  router.replace(returnUrl);
};
let formatList = (payload) => {
  if (payload) {
    payload = payload.forEach((item, index) => {
      item.address =
        item.province + item.city + item.county + item.addressDetail;
      item.id = index + 1;
    });
  }
};
let addressList = async () => {
  try {
    let res = await addressListApi({ userid: userid.value });
    list.value = res.data;
    formatList(list.value);
    nextTick(() => {
      // 勾选默认地址?
      chosenAddressId.value = 1;
    });
    // vant 地址列表 默认勾选 不能选中?
    console.log(list.value);
  } catch (err) {
    showFailToast(err.message);
  }
};
onMounted(() => {
  addressList();
});
</script>

<style lang="scss" scoped></style>
