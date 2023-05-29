<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import ComHeader from "@/components/ComHeader.vue";
import ComFooter from "@/components/ComFooter.vue";
</script>

<template>
  <ComHeader></ComHeader>
  <!-- <ComFooter></ComFooter> -->
  <RouterView />
  <RouterView name="footer" />
</template>

<style scoped></style>
