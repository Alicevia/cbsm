<template>
    <el-input v-model="authCode" placeholder="请输入验证码">
        <i @click="receiveAuthCode" slot="suffix" class="getCode">{{countDown}}</i>
    </el-input>
</template>

<script>
export default {
    props:{
        countDown:{
            type:String,
            required:true
        },
        authCode:{
            type:String,
            required:true
        },
        
    },
    data() {
        return {};
    },

    computed: {},

    mounted() {},

    methods: {
        async receiveAuthCode(){
            if (this.timeId) {
                return
            }
            this.timer()
            let data = {phone:this.ruleForm.phone}
            let result = reqResetAuthCode(data)
            if (result.data) {
                Message.success('验证码已经发送，请注意查看')
            }
        },
        timer(){
            this.time = 60
            this.timeId = setInterval(() => {
                this.time--
                this.countDown = `${this.time}s后可获取`
                if (this.time===0) {
                    clearInterval(this.timeId)
                    this.timeId=null;
                    this.countDown = '获取验证码'
                    return
                }
            }, 1000);
        },
    },

    components: {}
};
</script>
<style lang='less' scoped>
    .getCode {
        font-style: normal;
        cursor: pointer;
        color: #00b7c5;
        margin-right: 10px;
    }
</style>