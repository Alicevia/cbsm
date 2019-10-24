<template>
    <div>
    <div class="account home-right-common">
        <h2 class="title">账户信息</h2>
        <div class="account-wrap">
            <el-form
                :label-position="labelPosition"
                size="mini"
                class="account-form"
                label-width="26%"
            >
                <el-form-item label="头像">
                     <img :src="userInfo.headPicture" class="avatar">   
                </el-form-item>
                <el-form-item label="账号">
                    <p>{{userInfo.phone}}</p>
                </el-form-item>
                <el-form-item label="密码">
                    <p>******</p>
                    <span @click="changeDialogFormVisibleResetPassword">修改密码</span>
                </el-form-item>
                <el-form-item label="手机号">
                    <p>{{userInfo.phone}}</p>
                    <span @click="changeDialogFormVisibleChangePhone">{{userInfo.phone?'更换手机':'未绑定'}}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="userInfo.email" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="userInfo.address" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="公司">
                    <el-input v-model="userInfo.company" class="input-width"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeUserInfo" class="button-width">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <ResetPassWord :dialogFormVisible='dialogFormVisibleResetPassword' @changeDialogFormVisible='changeDialogFormVisibleResetPassword'/>
    <ChangePhone :dialogFormVisible='dialogFormVisibleChangePhone' :changeDialogFormVisible='changeDialogFormVisibleChangePhone'  />
    </div>

</template>

<script>
import { mapState, mapActions } from "vuex";
import {reqModiUserInfo,reqUserInfo} from 'src/api'
import { Message } from 'element-ui';
import ResetPassWord from 'pages/Home/Components/ResetPassWord'
import ChangePhone from 'pages/Home/Components/ChangePhone'
export default {
    data() {
        return {
            labelPosition: "right",
            dialogFormVisibleResetPassword:false,
            dialogFormVisibleChangePhone:false
        };
    },

    computed: {
        ...mapState(['userInfo'])
    },
    watch:{
      
    },
    created() {
    },
    mounted() {
     
    
    },
    methods: {
        ...mapActions(['getUserInfo']),
        // 控制重置密码对话框
        changeDialogFormVisibleResetPassword(){
            this.dialogFormVisibleResetPassword=!this.dialogFormVisibleResetPassword
        },
        // 控制更换手机对话框
        changeDialogFormVisibleChangePhone(){
            this.dialogFormVisibleChangePhone=!this.dialogFormVisibleChangePhone
        },
        async changeUserInfo(){
            let {address='',email='',company='',name='',nickName='',headPicture=''} = this.userInfo
            let info = {address,email,company,name,nickName,headPicture}
            // console.log(info)
            let result = await reqModiUserInfo(info)
            // console.log(result)
            if (result.succeed) {
                Message.success('修改成功')
                // this.getUserInfo()
            }else{
              Message.error('修改失败，请刷新页面')
            }

        },
        // handleAvatarSuccess(res, file) {
        //     console.log(res,file)
        //     this.imageUrl = URL.createObjectURL(file.raw);
        //     console.log(this.imageUrl)
        // },
        // beforeAvatarUpload(file) {
        //     const isJPG = file.type === "image/jpeg";
        //     const isLt2M = file.size / 1024 / 1024 < 2;

        //     if (!isJPG) {
        //         this.$message.error("上传头像图片只能是 JPG 格式!");
        //     }
        //     if (!isLt2M) {
        //         this.$message.error("上传头像图片大小不能超过 2MB!");
        //     }
        //     return isJPG && isLt2M;
        // }
    },
    components: {
        ResetPassWord,ChangePhone
    }
};
</script>
<style lang='less' scoped>
.account-form {
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            cursor: pointer;
            position: relative;
            overflow: hidden;
           
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
        }
        .avatar {
            width: 100px;
            height: 100px;
            display: inline-block;
            border-radius: 50%;
            margin-left: 1rem;

        }
        p {
            font-size: 14px;
            display: inline-block;
            margin-right: 10px;
            +span {
                color: #409EFF;
                cursor: pointer;
            }
        }
    // .avatar-img {
    //     display: inline-block;
    //     width: 1rem;
    //     height: 1rem;
    //     border-radius: 50%;
    //     margin-left: 1.5rem;
    //     vertical-align: top;
    //     margin-top: -0.2rem;
    //     background-image: url("~assets/images/avatar.jpg");
    //     background-size: cover;
    //     background-repeat: no-repeat;
    // }
}
</style>
