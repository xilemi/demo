<template>
  <div class="login">
    <van-form @submit="onSubmit" class="loginForm" ref="loginForm">
      <van-cell-group inset>
        <van-field
          v-model="loginParams.loginname"
          name="loginname"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginParams.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { showSuccessToast, showFailToast } from "vant";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
const loginParams = reactive({ loginname: "", password: "" });
let loginForm = ref();
// 登录可以放进pinia 中 完成数据持久化
const userStore = useUserStore();
const { loginAndUpdateUserInfo } = userStore;
const onSubmit = async () => {
  loginAndUpdateUserInfo(loginParams);
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  padding-top: 50px;
}
.loginForm {
  width: 90%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
}
</style>
