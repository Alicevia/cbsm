<template>
    <div class="message-server home-right-common">
        <h2 class="title">短信服务</h2>
        <div class="message-wrap">
            <el-form
                :label-position="labelPosition"
                size="mini"
                ref="messageServe"
                :rules="rules"
                label-width="26%"
                :model="aliMessageInfo"
            >
                <el-form-item label="短信通知">
                    <el-switch
                        v-model="messageSwitch"
                        :disabled="aliMessage"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    ></el-switch>
                </el-form-item>
                  <transition name="fade">
                      <div v-if="messageSwitch">
                      <el-form-item label="签名名称" prop="signName">
                          <el-input
                              class="input-width"
                              :disabled="inputControl.signName"
                              @input='changeAliMessageInfo({"signName":$event})'
                              :value="aliMessageInfo.signName"
                          ></el-input>
                          <span class="modify" @click="changeInputControl('signName')">修改</span>
                      </el-form-item>
                      <el-form-item label="KeyID" prop="accessKeyID">
                          <el-input
                              class="input-width"
                              :disabled="inputControl.accessKeyID"
                              @input='changeAliMessageInfo({"accessKeyID":$event})'
                              :value="aliMessageInfo.accessKeyID"
                          ></el-input>
                          <span class="modify" @click="changeInputControl('accessKeyID')">修改</span>
                      </el-form-item>
                      <el-form-item label="KeySecret" prop="accessKeySecret">
                          <el-input
                              class="input-width"
                              :disabled="inputControl.accessKeySecret"
                              @input='changeAliMessageInfo({"accessKeySecret":$event})'
                              :value="aliMessageInfo.accessKeySecret"
                          ></el-input>
                          <span class="modify" @click="changeInputControl('accessKeySecret')">修改</span>
                      </el-form-item>
                      <el-form-item label class="code">
                          <span>模板CODE</span>
                      </el-form-item>
                      <el-form-item label="报警通知" prop="warnSmsNotice">
                          <el-input
                              class="input-width"
                              :disabled="inputControl.warnSmsNotice"
                              @input='changeAliMessageInfo({"warnSmsNotice":$event})'
                              :value="aliMessageInfo.warnSmsNotice"
                          ></el-input>
                          <span class="modify" @click="changeInputControl('warnSmsNotice')">修改</span>
                      </el-form-item>
                      <el-form-item label="验证码" prop="verificationCode">
                          <el-input
                              class="input-width"
                              :disabled="inputControl.verificationCode"
                              @input='changeAliMessageInfo({"verificationCode":$event})'
                              :value="aliMessageInfo.verificationCode"
                          ></el-input>
                          <span class="modify" @click="changeInputControl('verificationCode')">修改</span>
                      </el-form-item>
                      <el-form-item>
                          <el-button
                              type="primary"
                              class="button-width"
                              @click="changeAliMessageServe"
                          >保存</el-button>
                      </el-form-item>
                  </div>
                  </transition>
                
                

            </el-form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { reqModiAliMessage } from "src/api";
import { Message } from "element-ui";
import Vue from "vue";
export default {
    data() {
        return {
            imageUrl: "",
            messageSwitch: false,
            labelPosition: "right",
            inputControl: {
                accessKeyID: true,
                accessKeySecret: true,
                warnSmsNotice: true,
                verificationCode: true,
                signName: true
            },
            rules: {
                accessKeyID: [
                    {
                        required: true,
                        message: "accessKeyID不能为空",
                        trigger: "blur"
                    }
                ],
                accessKeySecret: [
                    {
                        required: true,
                        message: "accessKeySecret不能为空",
                        trigger: "blur"
                    }
                ],

                signName: [
                    { required: true, message: "签名不能为空", trigger: "blur" }
                ],
                verificationCode: [
                    {
                        required: true,
                        message: "验证码不能为空",
                        trigger: "blur"
                    }
                ],
                warnSmsNotice: [
                    {
                        required: true,
                        message: "报警通知不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },

    computed: {
        ...mapGetters(["aliMessage"]),
        ...mapState(["aliId", "aliMessageInfo"])
    },
    watch: {},
    created() {
        this.getFindMessage();
    },

    mounted() {},

    methods: {
        ...mapActions(["modiAliMessageInfo", "getFindMessage"]),
        // 点击修改短信服务
        changeAliMessageServe() {
            this.$refs["messageServe"].validate(async v => {
                if (v) {
                    let result = await reqModiAliMessage(this.aliMessageInfo);
                    this.forbiddenInput()
                    if (result.succeed) {
                        Message.success("短信修改成功");
                    } else {
                        Message.error("短信修改失败");
                    }
                }
            });
        },
        // store同步修改
        changeAliMessageInfo(data) {
            this.modiAliMessageInfo(data);
        },
        // 开启input
        changeInputControl(data) {
            this.inputControl[data] = false;
        },
        // 禁止所有的input
        forbiddenInput() {
            let object = this.inputControl;
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    object[key] = true;
                }
            }
        }
    },

    components: {}
};
</script>
<style lang='less' scoped>
.code {
    margin-top: 50px;
    margin-bottom: 5px;
}
.modify {
    color: #00b7c5;
    text-decoration: underline;
    cursor: pointer;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

 