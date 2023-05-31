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
      <van-action-bar-icon icon="chat-o" text="评价" dot @click="chatPro" />
      <van-action-bar-icon icon="cart-o" text="购物车" badge="5" />
      <van-action-bar-icon icon="shop-o" text="店铺" />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="addCart"
      />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
    <!-- 圆角弹窗（底部） -->
    <van-popup
      v-model:show="flag"
      round
      closeable
      position="bottom"
      :style="{ height: '90%' }"
    >
      <template #default>
        <van-space direction="vertical" fill>
          <van-cell-group inset class="textareaBox">
            <van-field
              v-model="rateParams.message"
              rows="5"
              autosize
              type="textarea"
              maxlength="500"
              placeholder="请输入评价"
              show-word-limit
              class="textarea"
            />
          </van-cell-group>
          <van-rate v-model="rateParams.grade" style="margin-left: 20px" />
          <van-button type="primary" block @click="addRate"
            >发表评价</van-button
          >
        </van-space>
      </template>
    </van-popup>
  </div>
</template>

<script setup>
import { proDetailApi } from "@/api/pro.js";
import { addCartApi } from "@/api/cart.js";
import { addRateApi } from "@/api/rate.js";
import { orderListApi } from "@/api/user.js";
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
let flag = ref(false);
let isPurchased = ref(false);
console.log(proid);
let User = useUserStore();
let { isLogin, userid } = storeToRefs(User);
const rateParams = ref({
  userid: userid.value,
  proid: proid.value,
  grade: 0,
  message: null,
});
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
// 开启评价  需要购买后才能评价  获取订单 是否include 当前id
const checekPurchased = async () => {
  let res = await orderListApi({ userid: userid.value });
  isPurchased.value =
    res.data.findIndex((item) => item.proid == proid.value) != -1;
};
const chatPro = () => {
  if (isPurchased.value) {
    flag.value = true;
  }
};
const addRate = async () => {
  let res = await addRateApi(rateParams.value);
  console.log(res);
  flag.value = false;
  rateParams.value.grade = 0;
  rateParams.value.message = null;
};
onMounted(() => {
  proDetail();
  checekPurchased();
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
.textareaBox {
  margin-top: 50px;
  .textarea {
    border: 1px solid;
    border-radius: 10px;
  }
}
</style>
// 商品评价 userid proid 评分 评价内容 校验 该用户的订单内是否有此商品
有才能评价
