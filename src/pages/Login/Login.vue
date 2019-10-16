<template>
    <div class="login">
        <BgCanvas />
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import BgCanvas from "./BgCanvas";

import { mapActions } from 'vuex';


export default {
    data() {
        return {};
    },

    computed: {},
    created() {
        // this.checkUserToken()

    },
    mounted() {
      //  location.href='http://192.168.50.236:8080/?openid=oBUh059mnb-GkVYeGmJNouSQOBAo&accessToken=26_twwIeKl3iGCp0JGVqVWZAC-xwabsMc6VpM4bRCZIqN-VqB5_1Yng6NtipN-jV81BFZwUaMJz9JClooj-hTHoZIHiQmPtYbFuQQouLf15lsA#/home/wx'
    },

    methods: {
        //  checkUserToken() {
        //     let userToken = localStorage.getItem('user-token')
        //     if (userToken) {
        //        this.$router.replace({path:'/'})
        //     }
        // }
       
    },
    watch: {},
    components: {
        BgCanvas,

    }
};
</script>
<style lang='less' scoped>
.login {
    height: 100%;
    background: rgba(238, 238, 238, 1);
}
</style>