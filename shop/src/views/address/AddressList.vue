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
import { updateOrderAddressApi } from "@/api/order.js";
import { showFailToast } from "vant";
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
let list = ref([]);
let User = useUserStore();
const { getAddressInfo } = User;
let { userid, addressInfo } = storeToRefs(User);
const chosenAddressId = ref(0);
const router = useRouter();
const route = useRoute();
const time = ref(route.query.returnUrl);
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
const updateOrderAddress = async (item) => {
  console.log(addressInfo.value);
  let res = await updateOrderAddressApi({
    userid: userid.value,
    ...item,
    time: time.value.match(/\d{1,}/g)[0],
  });
  console.log(res);
};
const selectHandler = (item) => {
  // 将姓名电话  详细地址传递回去
  // 一定是调转回订单详细页面吗
  // 加一个是从那个页面来的  从哪里来就带着item回到那个页面
  // 点谁 谁就是默认地址 ? 将其他的设置为非默认地址?
  chosenAddressId.value = item.id;
  // 选择地址后 如何带回去
  if (route.query.returnUrl) {
    if (route.query.returnUrl.includes("orderDetail")) {
      updateOrderAddress(item);
    }
    router.replace(route.query.returnUrl);
    getAddressInfo({ address: item, chosenAddressId: chosenAddressId.value });
  }
};
let formatList = (payload) => {
  if (payload) {
    payload = payload.forEach((item, index) => {
      item.address =
        item.province + item.city + item.county + item.addressDetail;
      item.id = index;
    });
  }
};
let addressList = async () => {
  try {
    let res = await addressListApi({ userid: userid.value });
    list.value = res.data;
    formatList(list.value);
    let index = list.value.findIndex((item) => {
      return item.isDefault == true;
    });
    nextTick(() => {
      // 没有默认地址 就把 第一个选中
      if (addressInfo) {
        chosenAddressId.value = addressInfo.value.chosenAddressId;
      } else {
        chosenAddressId.value = index = index == -1 ? 0 : index;
        getAddressInfo({ address: list.value[index], chosenAddressId: index });
      }
    });
  } catch (err) {
    showFailToast(err.message);
  }
};
onMounted(() => {
  addressList();
});
</script>

<style lang="scss" scoped></style>
