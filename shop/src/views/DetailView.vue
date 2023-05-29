<template>
  <div class="detail">
    <van-swipe :autoplay="3000" lazy-render v-if="banner" class="banner">
      <van-swipe-item v-for="image in banner" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <van-cell v-if="detail">
      {{ detail.proname }}
      {{ detail.originprice }}
    </van-cell>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" dot />
      <van-action-bar-icon icon="cart-o" text="购物车" badge="5" />
      <van-action-bar-icon icon="shop-o" text="店铺" badge="12" />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="addCart"
      />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script setup>
import { proDetailApi } from "@/api/pro.js";
import { addCartApi } from "@/api/cart.js";
import { showFailToast, showSuccessToast } from "vant";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
let router = useRouter();
let route = useRoute();
let proid = ref(route.query.proid);
let detail = ref(null);
let banner = ref(null);
console.log(proid);
let User = useUserStore();
let { isLogin, userid } = storeToRefs(User);
// 获取商品详情
let proDetail = async () => {
  try {
    let res = await proDetailApi({ proid: proid.value });
    detail.value = res.data;
    banner.value = [
      detail.value.img1,
      detail.value.img2,
      detail.value.img3,
      detail.value.img4,
    ];
  } catch (err) {
    showFailToast(err.message);
  }
};
// 添加购物车
let addCart = async () => {
  // 检查是否登录 登录成功才能添加 否则 跳转登录页写带 returnUrl
  if (isLogin.value) {
    // 调添加购物车的接口
    try {
      let res = await addCartApi({
        proid: proid.value,
        userid: userid.value,
        num: 1,
      });
      console.log("添加购物车");
      showSuccessToast(res.message);
      router.push("/car");
    } catch (err) {
      showFailToast(err.message);
    }
  } else {
    router.replace({
      name: "login",
      query: { returnUrl: encodeURIComponent(route.fullPath) },
    });
  }
};
onMounted(() => {
  proDetail();
});
</script>

<style scoped lang="scss">
.detail {
  height: 100%;
  .banner {
    height: 30%;
    img {
      width: 100%;
    }
  }
}
</style>
