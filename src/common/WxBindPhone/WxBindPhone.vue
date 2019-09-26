<template>
    <div>
        <el-dialog title="绑定手机号码(必要)"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :show-close="false"
            :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="bindPhone">
                <el-form-item label="手机号码" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                    <el-input type="password" v-model="ruleForm.password" placeholder="请设置您的密码"></el-input>
                </el-form-item>
                <el-form-item label='验证码' prop="authCode"  :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.authCode" placeholder="请输入验证码">
                        <i @click="receiveAuthCode" slot="suffix" class="getCode">{{countDown}}</i>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="wxBindPhone">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {reqWxBindPhoneCode,reqWxBindPhone} from 'src/api'
import { Message } from 'element-ui';
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {
            dialogFormVisible: true,
            countDown:'获取验证码',
            forceClose:false,
            ruleForm: {
                phone: "",
                password: "",
                authCode: ""
            },
            rules: {
                phone: [
                    {
                        required: true,
                        message: "手机号不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 11,
                        max: 11,
                        message: "请输入11位手机号",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 99,
                        message: "密码不少于6位",
                        trigger: "blur"
                    }
                ],

                authCode: [
                    {
                        required: true,
                        message: "验证码不能为空",
                        trigger: "blur"
                    },
                    { min: 6, max: 6, message: "验证码为6位", trigger: "blur" }
                ]
            },
            formLabelWidth: "120px"
        };
    },

    computed: {
        ...mapState(['userInfo'])
     
    },
   
    mounted() {

    },

    methods: {
        ...mapActions(['getUserInfo']),
        async wxBindPhone(){
            let {password,phone,authCode} = this.ruleForm
            let data = {
                password,
                phone,
                verificationCode:authCode
            }
            let result = await reqWxBindPhone(data)
            if (result.data) {
                Message.success('手机绑定已经完成')
                this.dialogFormVisible=false
                // this.$router.replace({path:'/'})
            }

        },
        async receiveAuthCode(){
            if (this.timeId) {
                return
            }
            this.timer()
            let data = {phone:this.ruleForm.phone}
            let result =await reqWxBindPhoneCode(data)
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