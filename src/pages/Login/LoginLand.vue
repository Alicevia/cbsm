<template>
    <div class="login-land">
        <!-- 登录与返回 -->
        <template v-if="!qrcode">
            <div class="login-title" v-if="isLogin">
                <span class="iconfont">&#xe621;</span>
                <a href="javascript:;">登录</a>
            </div>
            <div class="login-title" v-else>
                <div @click.prevent="forgetPasswordChange" style="cursor:pointer;display:inline-block">
                    <span class="iconfont">&#xe62c;</span>
                    <a>返回</a>
                </div>
            </div>
           
            <!-- logo -->
            <div class="login-logo">
                <img class="login-img" src="~assets/images/logo02.png" alt />
            </div>
           
            <!-- 输入username与password -->
            <template v-if="isLogin">
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
                    <span @click="forgetPasswordChange">忘了密码？</span>|
                    <span @click="getWeChatQRCode">
                        <i class="iconfont">&#xe7e5;</i>微信扫码登录
                    </span>
                </div>
            </template>
            <!-- 点击忘了密码时候切换为用手机验证码 -->
            <div class="form-wrap" v-else>
                <el-form
                    v-if="forgetPW===0"
                    :model="ruleForm"
                    :rules="rules"
                    ref="checkSMS"
                    label-width="0"
                    class="user-login"
                >
                    <el-form-item label prop="phone">
                        <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label prop="authCode">
                        <el-input  v-model="ruleForm.authCode" placeholder="请输入验证码">
                            <i @click='receiveAuthCode'
                             slot="suffix" 
                             class="getCode"
                             >{{countDown}}</i>
                        </el-input>
                    </el-form-item>
                    <el-button @click='resetPwNext' class="login-btn" type="primary">下一步</el-button>
                </el-form>

                <el-form
                    v-else-if="forgetPW===1"
                    :model="ruleForm"
                    :rules="rules"
                    ref="resetPW"
                    label-width="0"
                    class="user-login"
                >
                    <el-form-item label prop="phone">
                        <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label prop="rePassword">
                        <el-input
                            type="password"
                            v-model="ruleForm.rePassword"
                            placeholder="请重新设定您的密码"
                        ></el-input>
                    </el-form-item>
                    <el-button class="login-btn"  @click="resetPWComplete" type="primary">完成</el-button>
                </el-form>
            </div>
            
        </template>
        <!-- 二维码展示区域 -->
        <div class="qrcode" id="qrcode" v-else></div>
    </div>
</template>

<script>
import {reqWeChatQRCode,reqWeChatLogin,reqPhoneLogin,
reqResetAuthCode,reqCheckSMS,reqResetPW} from 'src/api/index'
import utils from 'src/utils'
import {mapActions} from 'vuex'
import qs from 'qs'
import { Message } from 'element-ui';

export default {
  props:{},
  data () {
    return {
         forgetPW:0,
         qrcode:'',
         isLogin:true,//控制登陆与忘记状态
         countDown:'获取验证码',
         
         ruleForm: {
          phone: localStorage.getItem('phone')||'',
          password: '',
          authCode: '',
          rePassword:'',

          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
         rules: {
            phone: [
                { required: true, message: '手机号不能为空', trigger: 'blur' },
                { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' },
            
            ],
            password: [
                { required: true, message: '密码不能为空', trigger: 'blur' },
                { min: 6, max: 99, message: '密码不少于6位', trigger: 'blur' }
            ],
            rePassword: [
                { required: true, message: '密码不能为空', trigger: 'blur' },
                { min: 6, max: 99, message: '密码不少于6位', trigger: 'blur' }
            ],
            authCode: [
                { required: true, message: '验证码不能为空', trigger: 'blur' },
                { min: 6, max: 6, message: '验证码为6位', trigger: 'blur' },
            ],
        
        }
    }
    
  },

  computed: {
     
  },
  created(){
    
  },
  mounted(){
        
  },

  methods: {
      
        // 获取验证码重置手机密码
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
        //验证 短信发送的验证码是否正确
         resetPwNext(){
            this.$refs['checkSMS'].validate(async valid=>{
                if (!valid) return
                    let data = {
                        phone:this.ruleForm.phone,
                        code:this.ruleForm.authCode
                    }
                    let result = await reqCheckSMS(data) 
                    if (result.data) {
                        Message.success('验证通过')
                        this.forgetPW = 1; 
                    }else {
                        Message.error('短信验证失败')
                    }                  
                                
                    
            })
        },
        //重置密码最后一步
        resetPWComplete(){
            this.$refs['resetPW'].validate(async valid=>{
                if (!valid) return
                    let data = {
                        phone:this.ruleForm.phone,
                        password:this.ruleForm.rePassword
                    }
                    let result = await reqResetPW(data)      
                    if (result.data) {
                        Message.success('密码重置成功')
                        this.open()
                    }else {
                        Message.error('密码重置失败，请重新更改密码')
                        this.forgetPW=0
                        this.isLogin=true
                    }
                                 
            })
        },
        // 重置密码完成提示
        open() {
            this.$alert('点击跳转到登录页面', '密码已经设置完成', {
            confirmButtonText: '确定',
            callback: action => {
                this.forgetPW=0
                this.isLogin=true              
                }
            });
        },
        // 手机登陆与密码登陆页面切换
        forgetPasswordChange(){
            this.isLogin = !this.isLogin;
        },
        // 手机密码登陆
        passwordLogin (e){
            this.$refs['passwordLogin'].validate(async valid=>{
                if (!valid) return
                let {password,phone} = this.ruleForm
                let {succeed} = await reqPhoneLogin({password,phone})
                if (succeed) {
                    Message.success('亲爱的用户，欢迎上线')    
                    localStorage.setItem('phone',this.ruleForm.phone)
                    this.$router.replace({path:'/'})                    
                }else {
                    Message.error('用户名或密码错误')
                }

            })
        },
        //扫码跳转
        getOpenIdAccessToken(appid,redirect_uri) {
            var obj = new WxLogin({
                id: "qrcode",
                appid,
                scope: "snsapi_login",
                redirect_uri:encodeURIComponent(redirect_uri),
                state: Math.ceil(Math.random() * 1000),
                style: "black",           
            });
        },
    //   点击弹出二维码
        async getWeChatQRCode(){
            let {href} = window.location
            let result = await reqWeChatQRCode({trueUrl:href})
            let {appid,login,redirect_uri} = result.data
            //"http://wx.cluster-iot.cn/xx?trueUrl=http://192.168.50.236:8080/login?openid=oBUh059mnb-GkVYeGmJNouSQOBAo"  重定向网址
            let url = qs.parse(redirect_uri)
            let frontUrl = Object.keys(url) //obj[0]可以获取到前面一段url
            url = utils.queryURLParameter(url[frontUrl[0]])
            redirect_uri = `${frontUrl[0]}=http://${url.host}${url.search}`
            // console.dir(redirect_uri)
            
            //显示二维码
            this.qrcode = login //login是二维码图片 
            //扫码
            this.$nextTick(()=>this.getOpenIdAccessToken(appid,redirect_uri))              
             //  http://192.168.50.236:8080/?openid=oBUh059mnb-GkVYeGmJNouSQOBAo&accessToken=25_oXBtGHvN1AhmF2-cky27mki0Q7LNjn5h2qfmzZTqPjmPwlM-IhX3eaAnFXxDSOgHkBpzrQM_fvbdEfAq5bxrHI2LbMK-VtoguoCYtlXzINQ#/ 
        },
        // 倒计时工具
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

  components: {},
}

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
