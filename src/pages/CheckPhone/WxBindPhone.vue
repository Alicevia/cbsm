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
                        <i @click="receiveAuthCode" slot="suffix" :class="countDownClass">{{countDown}}</i>
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
            countDownClass: {
                getCode: true,
                stopClick: false
            },
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
                    },
                   
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
            this.$refs['bindPhone'].validate(async valid =>{
              if (!valid) return 
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
                  this.getUserInfo()
                  this.$router.replace({path:'/'})
              }else{
                  Message.error('绑定失败，请重新验证')
                  this.$router.replace({path:'/login'})
              }


            })
           

        },
        receiveAuthCode(){
            if (this.timeId) {
                return
            }
           this.$refs.bindPhone.validateField("phone", async errMsg => {
                if (errMsg) return; //如果有错误那么errMSG为true
                let data = { phone: this.ruleForm.phone };
                this.timer();
                this.countDownClass.stopClick = true;
                let result = await reqWxBindPhoneCode(data);
                if (result.data) {
                    Message.success("验证码已经发送，请注意查看");
                } else {
                    if (result.code ===-3) {
                        Message.error('请更换手机号')
                    }else{
                        Message.error("验证码发送失败");
                    }
                }

            });
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
                    this.countDownClass.stopClick = false;
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
.stopClick {
    color: rgb(185, 185, 185);
    cursor: not-allowed;
}
</style>