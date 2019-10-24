<template>
  <div class="wx-manage home-right-common">
    <h2 class="title">微信管理</h2>
    
    <div class="wx-wrap">
      <el-form
        :label-position="labelPosition"
        size="mini"
        label-width="26%"
        :model="weChatInfo"
        :rules="rules"
        ref="wxManage"
      >
        <el-form-item label="APPID" prop="appId">
          <el-input
            :value="weChatInfo.appId"
            @input="changeWeChatInfo({'appId':$event})"
            class="input-width"
          ></el-input>
          <span class="cursor-pointer" @click="checkAuth">检查</span>
        </el-form-item>
        <el-form-item label="微信授权">
          <span>{{isAuth}}</span>
          <el-button
            :disabled="firstTime"
            @click="togglePopupWx"
            type="primary"
            style="marginLeft:.2rem"
          >{{reAuth}}</el-button>
        </el-form-item>
        <el-form-item label="微信推送通知开关">
          <el-switch
            v-model="wxSwitch"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="weChatInfo.id?false:true"
          ></el-switch>
        </el-form-item>

        <transition name="fade">
          <div v-if="wxSwitch">
            <el-form-item label="上线通知">
              <el-input
                :disabled="modiControl.online"
                :value="weChatInfo.onlineTemplateId"
                @input="changeWeChatInfo({'onlineTemplateId':$event})"
                class="input-width"
              ></el-input>
              <span class="cursor-pointer" @click="changeModiControl('online')">修改</span>
            </el-form-item>
            <el-form-item label="下线通知">
              <el-input
                :disabled="modiControl.offline"
                :value="weChatInfo.offlineTemplateId"
                @input="changeWeChatInfo({'offlineTemplateId':$event})"
                class="input-width"
              ></el-input>
              <span class="cursor-pointer" @click="changeModiControl('offline')">修改</span>
            </el-form-item>
            <el-form-item label="报警消息">
              <el-input
                :disabled="modiControl.warning"
                :value="weChatInfo.warnTemplateId"
                @input="changeWeChatInfo({'warnTemplateId':$event})"
                class="input-width"
              ></el-input>
              <span class="cursor-pointer" @click="changeModiControl('warning')">修改</span>
            </el-form-item>
            <el-form-item label="检测报告">
              <el-input
                :disabled="modiControl.report"
                :value="weChatInfo.reportTemplateId"
                @input="changeWeChatInfo({'reportTemplateId':$event})"
                class="input-width"
              ></el-input>
              <span class="cursor-pointer" @click="changeModiControl('report')">修改</span>
            </el-form-item>
          </div>
        </transition>
        <el-form-item label="微信公众号名称" prop="name">
          <el-input
            :disabled="modiControl.wxName"
            :value="weChatInfo.name"
            @input="changeWeChatInfo({'name':$event})"
            class="input-width"
          ></el-input>
          <span class="cursor-pointer" @click="changeModiControl('wxName')">修改</span>
        </el-form-item>
        <el-form-item label="微信公众号LOGO" prop="customerIcon">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :on-change="handleChange"
            :auto-upload="false"
          >
            <img v-if="weChatInfo.customerIcon" :src="weChatInfo.customerIcon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="saveWeChatInfo" class="button-width" type="primary">{{initWxInfo}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 图片裁切 -->
    <Cropper :toChildimgFile="toChildimgFile"
    :getChildImgFile='getChildImgFile'
     ref="vueCropper" />
    <!-- 重新授权 -->
    <PopupWx v-if="dialogVisible" :dialogVisible="dialogVisible" @toggle="togglePopupWx" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
  reqInitWeChatAuthInfo,
  reqModiWeChatAuth,
  reqCheckAuth,
  reqUserInfo
} from "src/api";
import { Message } from "element-ui";
import PopupWx from "pages/Home/Components/PopupWx";
import Cropper from "src/common/Cropper/Cropper";
export default {
  data() {
    return {
      labelPosition: "right",
      check1: "测试",
      dialogVisible: false,
      modiControl: {
        online: true,
        offline: true,
        warning: true,
        report: true,
        wxName: true
      },
      wxSwitch: false,
      toChildimgFile:'',
      rules: {
        appId: [
          {
            required: true,
            message: "appId不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "公众号名称不能为空",
            trigger: "blur"
          }
        ],
        customerIcon: [
          {
            required: true,
            message: "logo不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },

  computed: {
    ...mapState(["weChatInfo"]),
    firstTime() {
      return this.weChatInfo.id ? false : true;
    },
    initWxInfo() {
      return this.firstTime ? "初始化" : "保存";
    },
    isAuth() {
      return this.weChatInfo.isAuthorize ? "已授权" : "未授权";
    },
    reAuth() {
      return this.isAuth === "已授权" ? "重新授权" : "授权";
    }
  },
  watch: {},
  created() {
    // reqUserInfo()
  },
  mounted() {},
  activated() {},

  methods: {
    ...mapActions(["modiWeChatInfo", "getAliMessageAuth", "getWeChatAuthInfo"]),
    // 映射修改store中的信息
    changeWeChatInfo(data) {
      this.modiWeChatInfo(data);
    },
    // 更改公众号信息
    saveWeChatInfo() {
      this.$refs["wxManage"].validate(async v => {
        if (!v) return;
        this.forbiddenInput(); //禁止用户修改
        if (this.firstTime) {
          let data = this.cellectWeChatInfo();
          let result = await reqInitWeChatAuthInfo(data);
          console.log(result);
          if (result.succeed) {
            Message.success("初始化信息成功");
            // this.modiWeChatInfo(result.data)
            this.getAliMessageAuth();
            this.getWeChatAuthInfo();
            this.img = null;
          } else {
            Message.error("初始化信息失败");
          }
        } else {
          let data = this.cellectWeChatInfo();
          let result = await reqModiWeChatAuth(data);
          if (result.succeed) {
            Message.success("修改成功");
            this.img = null;
            // this.modiWeChatInfo(result.data)
            this.getAliMessageAuth();
          } else {
            Message.error("修改失败");
          }
        }
      });
    },
    // 收集公众号信息
    cellectWeChatInfo() {
      let {
        appId,
        name,
        offlineTemplateId,
        onlineTemplateId,
        id,
        reportTemplateId,
        warnTemplateId
      } = this.weChatInfo;
      let data = {
        appId,
        name,
        offlineTemplateId,
        onlineTemplateId,
        reportTemplateId,
        warnTemplateId,
        id
      };
      // console.log(data)
      let formdata = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
          formdata.append([key], data[key]);
        }
      }
      // 如果上传了图片那么将图片追加到formdata
      if (this.img) {
        formdata.append("file", this.img);
      }
      return formdata;
    },

    // 显示裁切组件
    showCropper() {
      this.$refs["vueCropper"].handleCloseOrOpenCropper();
    },
    // 获取适合大小的图片
    // 接收img raw
    handleChange(file) {
      // 将文件传递给接口 后期可能修改
      this.img = file.raw;
      //显示裁切组件
      this.showCropper();
      // 获取到用户选择的图片file
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      // console.log(file.raw)
      // 将文件转为base64
      reader.onload = e => {
        // console.log(e)
        // 将base64文件传递给子组件 用于裁切
        this.toChildimgFile =  e.target.result
        // this.modiWeChatInfo({ customerIcon: e.target.result });
      };
    },
    // 获取裁切组件的图片file格式
    getChildImgFile(file,baseImg){
      // console.log(baseImg)
      this.img = file
       this.modiWeChatInfo({ customerIcon: baseImg});
    },

    // wx授权
    togglePopupWx() {
      this.dialogVisible = !this.dialogVisible;
      if (!this.dialogVisible) {
        this.getWeChatAuthInfo();
      }
    },
    //查询授权
    checkAuth() {
      this.$refs["wxManage"].validateField("appId", async error => {
        if (error) return;
        let data = {
          appId: this.weChatInfo.appId
        };
        let result = await reqCheckAuth(data);
        if (result.succeed && result.data.isAuthorize) {
          if (this.firstTime) {
            Message.success("公众号已授权,需要初始化信息");
          } else {
            Message.success("公众号已授权");
          }
        } else {
          Message.success("公众号未授权,请先初始化信息方可授权");
        }
      });
    },
    // 让用户可以修改 让input解封
    changeModiControl(data) {
      this.modiControl[data] = false;
    },
    //让input禁止输入
    forbiddenInput() {
      let object = this.modiControl;
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          object[key] = true;
        }
      }
    }
  },

  components: {
    PopupWx,
    Cropper
  }
};
</script>
<style lang='less' scoped>
/deep/ .avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px dashed #d9d9d9;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  color: #8c939d;
  width: 1.78rem;
  height: 1.78rem;
  line-height: 1.78rem;
  text-align: center;
}
.avatar {
  width: 1.78rem;
  height: 1.78rem;
  display: block;
}
.cursor-pointer {
  color: #409eff;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>