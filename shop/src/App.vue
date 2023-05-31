<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import ComHeader from "@/components/ComHeader.vue";
import ComFooter from "@/components/ComFooter.vue";
</script>

<template>
  <div class="box">
    <ComHeader class="header"></ComHeader>
    <!-- <ComFooter></ComFooter> -->
    <RouterView class="main" />
    <RouterView name="footer" />
  </div>
</template>

<style lang="scss">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main {
    overflow: scroll;
  }
}
</style>
