<template>
    <div class="logout">
        <span class="iconfont">&#xe60d;</span>
        <a href="javascript:;" @click="logOut">[退出]</a>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { Message } from "element-ui";
import {reqLogout} from 'src/api'
export default {
    data() {
        return {};
    },

    computed: {},

    mounted() {},

    methods: {
        ...mapActions(["getUserLogout",'deleteUserToken']),

        async logOut() {
            let result = await reqLogout();
            if (result.data) {
                localStorage.removeItem("user-token");
                this.deleteUserToken()
                Message.success('您已退出登录')
                let a = setTimeout(()=>{
                  clearTimeout(a)
                  // this.$router.replace({ path: "/login/phone" });
                  let origin = window.location.origin
                  let pathname = window.location.pathname
                  window.location.href =origin+pathname
                },500)

            }else{
                Message.error('用户信息已过期，请刷新页面重新登陆')
                
                this.$router.replace({path:'/login/phone'})
            }
        }
    },

    components: {}
};
</script>
<style lang='less' scoped>
.logout {
    text-align: right;
    margin-top: 0.16rem;
    margin-right: 0.16rem;
    font-size: 0.18rem;
    color: white;
    a {
        color: white;
        margin-left: 0.05rem;
    }
    span {
        vertical-align: middle;
    }
}
</style>