<template>
  <div class="listBox">
    <van-sidebar v-model="active" @change="onChange" class="left">
      <van-sidebar-item
        :title="item"
        v-for="(item, index) in categoryList"
        :key="index"
      />
    </van-sidebar>
    <div>
      <!-- 需要传 category brand  count limitNum-->
      <van-space wrap>
        <van-button
          type="primary"
          v-for="(item, index) in categoryBrandList"
          :key="index"
          @click="categoryBrandProList(item.brand, active)"
          >{{ item.brand }}</van-button
        >
      </van-space>
    </div>
  </div>
</template>

<script setup>
import {
  proCategoryListApi,
  proCategoryBrandListApi,
  proCategoryBrandProListApi,
} from "@/api/pro.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const categoryList = ref(null);
const categoryBrandList = ref(null);
const active = ref(0);
const router = useRouter();
const proCategoryList = async () => {
  let res = await proCategoryListApi();
  categoryList.value = res.data;
  proCategoryBrandList(active.value);
  console.log(categoryList.value);
};
const proCategoryBrandList = async (index) => {
  console.log(categoryList.value[index]);
  let res = await proCategoryBrandListApi({
    category: categoryList.value[index],
  });
  categoryBrandList.value = res.data;
  console.log(res);
};
const onChange = () => {
  proCategoryBrandList(active.value);
};
const categoryBrandProList = (brand, category) => {
  router.push({
    path: "/proBrand",
    query: { brand, category: categoryList.value[category] },
  });
};
onMounted(() => {
  proCategoryList();
});
</script>

<style lang="scss" scoped>
.listBox {
  display: flex;
  .left {
    flex-shrink: 0;
  }
}
</style>
// 获取所有分类
