<template>
  <div id="app">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
import { reqWeChatLogin, reqUserInfo } from "src/api";
import {mapActions, mapState} from 'vuex'
import qs from 'qs'
export default {

  data () {
    return {
    };
  },


  computed: {
    ...mapState(['userToken'])

  },
  created(){
     this.checkUserToken()
  },
  mounted(){
  },

  methods: {
        ...mapActions([
      "getUserInfo",
      "getWeChatAuthInfo",
      "getAliMessageAuth",
      "getFindMessage"
    ]),
    // 检测用户是否绑定手机 并且将个人信息存入store一份
    async checkUserPhone_SaveUserInfo() {
      let result = await reqUserInfo()
      // console.log(result)
      if (result.succeed) {
        if (!result.data.phone) {
          // console.log('-')
          this.$router.replace({ path: "/bindphone" })
        } else {
          this.getUserInfo();
          this.getWeChatAuthInfo();
          this.getAliMessageAuth();
        }
      }
    },
    // 检测userToken是否有效
    async checkUserToken() {
      let localUserToken = this.userToken;
      if (localUserToken) {
        this.checkUserPhone_SaveUserInfo();
      } else {
        let { search } = window.location;
        if (search) {
          let { accessToken, openid } = qs.parse(search, {
            ignoreQueryPrefix: true
          });
          let result = await reqWeChatLogin({ accessToken, openid });
          if (result.succeed) {
            this.checkUserPhone_SaveUserInfo();
          } else {
            Message.error("微信登陆失败，请重新登陆");
            this.$router.push({ path: "/login" });
          }
        } else {
          this.$router.push({ path: "/login" });
        }
      }
    }
  },
  components: {
      
  },

}

</script>
<style lang='less'>
    @import '~src/assets/css/reset.less'; 
    @import '~src/assets/css/common.less';
    @import './assets/iconfont/iconfont.css';
    html {
        font-size: 100px;
        width: 100%;
        height: 100%;
        font-family: 'Microsoft YaHei'
    }
    body {
        width: 100%;
        height: 100%;

    }
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
   
</style>