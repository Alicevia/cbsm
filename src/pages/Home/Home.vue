<template>
  <div class="home">
    <div class="home-left">
      <Logo />
      <Avatar />
      <Nav />
    </div>
    <div class="home-right">
      <Logout />
      <div class="home-right-wrap">
        <transition name="slide-left" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import axios from "axios";
import qs from "qs";
import Logo from "./Logo";
import Logout from "./Logout";
import Avatar from "./Avatar";
import Nav from "./Nav";
import { Message } from "element-ui";
import { reqWeChatLogin, reqUserInfo } from "src/api";
export default {
  data() {
    return {};
  },

  computed: {
    ...mapState(["userToken", "userInfo"]),
    ...mapGetters(["bindPhone"])
  },
  created() {
    // 默认访问的是这个页面，所以页面一打开就是这个页面，
    // 之后会跳转到登陆页面，登陆成功了后，不会进入这个生命周期函数
    // this.checkUserToken()
    //this.getAliMessageAuth()
  },
  mounted() {},
  methods: {
    // ...mapActions([
    //   "getUserInfo",
    //   "getWeChatAuthInfo",
    //   "getAliMessageAuth",
    //   "getFindMessage"
    // ]),
    // // 检测用户是否绑定手机 并且将个人信息存入store一份
    // async checkUserPhone_SaveUserInfo() {
    //   let result = await reqUserInfo()
    //   if (result.succeed) {
    //     if (!result.data.phone) {
    //       this.$router.replace({ path: "/bindphone" })
    //     } else {
    //       this.getUserInfo();
    //       this.getWeChatAuthInfo();
    //       this.getAliMessageAuth();
    //     }
    //   }
    // },
    // // 检测userToken是否有效
    // async checkUserToken() {
    //   let localUserToken = this.userToken;
    //   if (localUserToken) {
    //     this.checkUserPhone_SaveUserInfo();
    //   } else {
    //     let { search } = window.location;
    //     if (search) {
    //       let { accessToken, openid } = qs.parse(search, {
    //         ignoreQueryPrefix: true
    //       });
    //       let result = await reqWeChatLogin({ accessToken, openid });
    //       if (result.succeed) {
    //         this.checkUserPhone_SaveUserInfo();
    //       } else {
    //         Message.error("微信登陆失败，请重新登陆");
    //         this.$router.push({ path: "/login" });
    //       }
    //     } else {
    //       this.$router.push({ path: "/login" });
    //     }
    //   }
    // }
  },
  components: {
    Logo,
    Avatar,
    Nav,
    Logout
  }
};
</script>
<style lang='less' scoped>
.home {
  display: flex;
  height: 100%;
  .home-left {
    width: 3rem;
  }
  .home-right {
    flex: 1;
    background-image: url("http://img.cluster-dt.com/bg-home.49316c4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100%;
    // overflow-y: scroll;
    // overflow-x: hidden;
    .home-right-wrap {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      .slide-left-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
      }
      .slide-left-enter-active,
      .slide-left-leave-active {
        transition: all 0.5s;
      }
      .slide-left-leave-to {
        opacity: 0;
        transition: translate3d(-100%, 0, 0);
      }
    }
  }
}
</style>