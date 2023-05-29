<template>
  <div>
    <!-- 有默认地址选择默认地址  没有显示添加地址-->
    <van-contact-card type="add" @click="onAdd" add-text="添加地址" />
    <van-card
      v-for="item in orderList"
      :key="item.proid"
      :price="(item.originprice * item.discount) / 10"
      :title="item.proname"
      class="goods-card"
      :thumb="item.img1"
      :num="item.num"
    />
  </div>
</template>

<script setup>
// 购物车页面点击提交订单 添加订单
// 本页面渲染 订单信息
import { confirmOrderApi } from "@/api/order.js";
import { listCartApi } from "@/api/cart.js";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { showFailToast, showSuccessToast } from "vant";
let User = useUserStore();
let { userid } = storeToRefs(User);
let route = useRoute();
let router = useRouter();
let listId = ref(JSON.parse(route.query.info));
const cartList = ref([]);
const orderList = ref([]);
let getOrderList = async () => {
  let res = await listCartApi({ userid: userid.value });
  cartList.value = res.data;
  listId.value.forEach((item) => {
    orderList.value.push(
      cartList.value.find((pro) => {
        return pro.proid == item;
      })
    );
  });
  console.log(orderList.value);
};
// 点击添加地址  跳转到地址页面   如果存在默认地址应该直接 显示默认地址
const onAdd = () => {
  router.push("/addressList");
};
// 订单时间从购物车提交订单获取 通过路由带过来
// let confirmOrder = async () => {
//   try {
//     let res = await confirmOrderApi({ userid: userid.value, time: time.value });
//     list.value = res.data;
//     console.log(list.value);
//     showSuccessToast(res.message);
//   } catch (err) {
//     showFailToast(err.message);
//   }
// };
onMounted(() => {
  // confirmOrder();
  getOrderList();
});
</script>

<style lang="scss" scoped></style>
