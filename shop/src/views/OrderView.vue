<template>
  <div>
    <!-- 有默认地址选择默认地址  没有显示添加地址-->
    <van-contact-card
      type="edit"
      :name="address.name"
      :tel="
        address.tel +
        (address.province == address.city
          ? address.city
          : address.province + address.city) +
        address.county +
        address.addressDetail
      "
      :editable="true"
      @click="onEdit"
      v-if="address"
    />
    <van-contact-card type="add" @click="onAdd" add-text="添加地址" v-else />

    <van-card
      v-for="item in orderList"
      :key="item.proid"
      :price="(item.originprice * item.discount) / 10"
      :title="item.proname"
      class="goods-card"
      :thumb="item.img1"
      :num="item.num"
    />
    <van-submit-bar
      :price="totalPrice"
      button-text="确认订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup>
// 购物车页面点击提交订单 添加订单
// 本页面渲染 订单信息
import { addOrderApi } from "@/api/order.js";
import { getDefaultAddressApi } from "@/api/address.js";
import { listCartApi } from "@/api/cart.js";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
let User = useUserStore();
let { userid, addressInfo } = storeToRefs(User);
let route = useRoute();
let router = useRouter();
const cartList = ref([]);
const orderList = ref([]);
const address = ref(null);
const totalPrice = ref(0);
const getTotalPrice = async () => {
  totalPrice.value = await orderList.value.reduce((prve, item) => {
    return prve + item.originprice * item.discount * item.num * 10;
  }, 0);
};
// 其实就是查购物车勾选的商品
let getOrderList = async () => {
  let res = await listCartApi({ userid: userid.value });
  cartList.value = res.data;
  orderList.value = cartList.value.filter((item) => {
    return item.flag == true;
  });
  console.log(orderList.value);
  getTotalPrice();
};

const getAddress = async () => {
  // 有默认地址显示默认地址

  // let res = await getDefaultAddressApi({ userid: userid.value });
  // if (res.data[0]) {
  //   address.value = res.data[0];
  //   console.log(res.data);
  // }

  // if (route.query.item) {
  //   console.log(111);
  //   address.value = await JSON.parse(route.query.item);
  // }
  address.value = addressInfo.value.address;
  console.log(address.value);
};
// 点击添加地址  跳转到地址页面   如果存在默认地址应该直接 显示默认地址
const onEdit = () => {
  router.push({
    path: "/addressList",
    query: { returnUrl: route.fullPath },
  });
};
const onAdd = () => {
  router.push({
    path: "/addressList",
    query: { returnUrl: route.fullPath },
  });
};
// 选好地址后切换地址
// 确认订单 使用  addOrderApi
const onSubmit = async () => {
  let res = await addOrderApi({ userid: userid.value });
  router.push("/orderList");
  console.log(res);
};
onMounted(() => {
  getAddress();
  getOrderList();
});
</script>

<style lang="scss" scoped></style>
