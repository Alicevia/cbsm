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
       
    },

    methods: {
         checkUserToken() {
            let userToken = localStorage.getItem('user-token')
            if (userToken) {
               this.$router.replace({path:'/'})
            }
        }
       
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