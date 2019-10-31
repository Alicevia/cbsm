<template>
  <div class="login-land">
    <!-- 登录 -->
    <div class="login-title">
      <span class="iconfont">&#xe621;</span>
      <a href="javascript:;">登录</a>
    </div>
    <!-- logo -->
    <div class="login-logo">
      <img class="login-img" src="~assets/images/logo02.png" alt />
    </div>
    <!-- 输入username与password -->
    <div class="form-wrap">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="passwordLogin"
        label-width="0"
        class="user-login"
      >
        <el-form-item label prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="用户手机号码">
            <i slot="prefix" class="iconfont">&#xe678;</i>
          </el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="密码">
            <i slot="prefix" style="fontSize:26px" class="iconfont">&#xe623;</i>
          </el-input>
        </el-form-item>
        <el-button @click="passwordLogin" class="login-btn" type="primary">登录</el-button>
      </el-form>
    </div>
    <div class="login-way">
      <router-link to="/login/forget" tag="span">忘了密码？</router-link>|
      <router-link to="/login/wx" tag="span">
        <i class="iconfont">&#xe7e5;</i>微信扫码登录
      </router-link>
    </div>
  </div>
</template>

<script>
import { reqPhoneLogin, reqUserInfo } from "src/api/index";
import utils from "src/utils";
import { mapActions } from "vuex";
import qs from "qs";
import { Message } from "element-ui";

export default {
  props: {},
  data() {
    return {
      ruleForm: {
        phone: localStorage.getItem("phone") || "",
        password: ""
      },
      rules: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 99, message: "密码不少于6位", trigger: "blur" }
        ]
      }
    };
  },

  computed: {},
  created() {},
  mounted() {},

  methods: {
    ...mapActions(["getUserInfo", "getWeChatAuthInfo", "getAliMessageAuth"]),
    // 获取基本的各类信息
    async receiveUserInfo() {
      let result = await reqUserInfo();
      if (result.succeed) {
        this.getUserInfo();
        this.getWeChatAuthInfo();
        this.getAliMessageAuth();
      }
    },
    // 手机密码登陆
    passwordLogin(e) {
      this.$refs["passwordLogin"].validate(async valid => {
        if (!valid) return;
        let { password, phone } = this.ruleForm;
        let { succeed } = await reqPhoneLogin({ password, phone });
        if (succeed) {
          Message.success("亲爱的用户，欢迎上线");
          localStorage.setItem("phone", this.ruleForm.phone);
          this.receiveUserInfo();
          this.$router.replace("/home/wx/public");
        } else {
          Message.error("用户名或密码错误");
        }
      });
    }
  },

  components: {}
};
</script>
<style lang='less' scoped>
.login-land {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  height: 480px;
  width: 600px;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.2);
  .login-title {
    width: 560px;
    a {
      cursor: pointer;
      font-size: 14px;
      color: rgba(55, 61, 65, 1);
    }
  }
  .login-logo {
    text-align: center;
    margin: 45px 0;
  }
  .login-img {
    width: 210px;
    height: 60px;
    display: inline-block;
  }
  .form-wrap {
    text-align: center;
    .user-login {
      display: inline-block;
      width: 400px;
      .login-btn {
        display: inline-block;
        width: 400px;
      }
      .getCode {
        font-style: normal;
        cursor: pointer;
        color: #00b7c5;
        margin-right: 10px;
      }
    }
    .iconfont {
      font-size: 20px;
    }
  }
  .login-way {
    text-align: center;
    margin: 40px auto 60px;
    font-size: 14px;
    color: #00b7c5;
    span {
      margin: 0 30px;
      cursor: pointer;
    }
    i {
      margin-right: 10px;
      color: green;
      cursor: default;
    }
  }

  .qrcode {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    height: 400px;
    margin: auto;
    text-align: center;

    h3 {
      font-size: 20px;
      font-weight: normal;
    }
    img {
      width: 282px;
      height: 282px;
      display: inline-block;
      background-color: pink;
      margin: 20px 0;
    }
  }
}
</style>
