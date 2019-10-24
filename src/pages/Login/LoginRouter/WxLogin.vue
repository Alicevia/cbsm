<template>
  <div class="login-land">
    <router-link to="login/phone" class="back">
      <span class="iconfont">&#xe62c;</span>
      返回
    </router-link>
    <div class="qrcode" id="qrcode"></div>
  </div>
</template>

<script>
import { reqWeChatQRCode } from "src/api/index";
import utils from "src/utils";
import { mapActions } from "vuex";
import qs from "qs";
import { Message } from "element-ui";

export default {
  props: {},
  data() {
    return {};
  },

  computed: {},
  created() {},
  mounted() {},
  activated() {
    this.getWeChatQRCode();
  },

  methods: {
    //   点击弹出二维码
    async getWeChatQRCode() {
      // let href = window.location.href.split('#')[0];
      let origin = window.location.origin;
      let pathname = window.location.pathname;
      let href = origin + pathname;
      let result = await reqWeChatQRCode({ trueUrl: href });
      // console.log(result);
      if (result.code === 0) {
        let { appid, login, redirect_uri } = result.data;
        new WxLogin({
          id: "qrcode",
          appid,
          scope: "snsapi_login",
          redirect_uri: encodeURIComponent(redirect_uri),
          state: Math.ceil(Math.random() * 1000),
          self_redirect:false,
          style: "black"
        });
        let iframe = document.querySelector("#qrcode>iframe");
        iframe.sandbox = "allow-scripts allow-top-navigation allow-same-origin";
      }else{
        Message.error('微信二维码获取失败,请刷新页面')
      }

      //  iframe.sandbox = 'allow-top-navigation'
      // iframe.security='restrict'
      // iframe.sandbox = ''
      //  http://192.168.50.236:8080/?openid=oBUh059mnb-GkVYeGmJNouSQOBAo&accessToken=25_oXBtGHvN1AhmF2-cky27mki0Q7LNjn5h2qfmzZTqPjmPwlM-IhX3eaAnFXxDSOgHkBpzrQM_fvbdEfAq5bxrHI2LbMK-VtoguoCYtlXzINQ#/
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
  .back {
    color: rgba(55, 61, 65, 1);
    font-size: 14px;
  }
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
