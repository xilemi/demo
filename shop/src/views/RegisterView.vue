<template>
  <div class="register">
    <van-form @submit="onSubmit" class="registerForm" ref="registernForm">
      <van-cell-group inset>
        <van-field
          v-model="regParams.tel"
          name="tel"
          label="手机号"
          placeholder="手机号"
          :rules="rulesTel"
        />
        <van-field
          v-model="regParams.password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          type="password"
        />
      </van-cell-group>
      <van-cell-group inset>
        <van-field
          v-model="code"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
          :rules="rulesCode"
        >
          <template #button>
            <van-button size="small" type="primary" @click="dosendmsgcode()"
              >发送验证码</van-button
            >
          </template>
        </van-field>
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
import {
  docheckphoneApi,
  docheckcodeApi,
  dosendmsgcodeApi,
  dofinishregisterApi,
} from "@/api/user.js";
// 用户名参数
let regParams = reactive({ tel: "13147146358", password: "123123" });
let sms = ref("");
let code = ref("");
let registerForm = ref();
//验证手机号是否存在
let validateTel = async () => {
  try {
    let res = await docheckphoneApi({ tel: regParams.tel });
  } catch (err) {
    return err.message;
  }
};
// 验证验证码
let docheckcode = async () => {
  if (regParams.tel) {
    try {
      let res = await docheckcodeApi({
        tel: regParams.tel,
        telcode: code.value,
      });
    } catch (err) {
      return err.message;
    }
  }
};
let rulesTel = [
  { required: true, message: "请填写手机号" },
  { pattern: /^1[3-9]\d{9}$/, message: "请填写正确的电话号码" },
  { validator: validateTel, message: "手机号已经被注册", trigger: "onBlur" },
];
let rulesCode = [
  { validator: docheckcode, message: "验证码错误" },
  { required: true, message: "请填写验证码" },
];
//发送验证码
let dosendmsgcode = async () => {
  let res = await dosendmsgcodeApi({ tel: regParams.tel });
  sms.value = res.data;
  console.log(res.data);
};
// 注册
let router = useRouter();
const onSubmit = async () => {
  try {
    let res = await dofinishregisterApi(regParams);
    showSuccessToast(res.message);
    router.push("/login");
  } catch (err) {
    showFailToast(err.message);
  }
};
</script>

<style scoped>
.register {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  padding-top: 50px;
}
.registerForm {
  width: 90%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
}
</style>
