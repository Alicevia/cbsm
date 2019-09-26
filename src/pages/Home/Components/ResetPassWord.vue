<template>
    <div>
        <el-dialog
            title="修改密码"
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :before-close="close"
        >
            <el-form ref="changePw" :model="form" :rules="rules">
                <el-form-item label="旧密码" prop="oldPW" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.oldPW" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPW" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.newPW" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeResetPW">取 消</el-button>
                <el-button type="primary" @click="changePassword">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { Message } from "element-ui";
import { reqChangePassword } from "src/api";
export default {
    props: {
        dialogFormVisible: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            // dialogFormVisible: false,
            form: {
                oldPW: "",
                newPW: ""
            },
            rules: {
                oldPW: [
                    {
                        required: true,
                        message: "旧密码不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 99,
                        message: "请输入6位以上的密码",
                        trigger: "blur"
                    }
                ],
                newPW: [
                    {
                        required: true,
                        message: "新密码不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 99,
                        message: "请输入6位以上的密码",
                        trigger: "blur"
                    }
                ]
            },
            formLabelWidth: "120px"
        };
    },

    computed: {},

    mounted() {},

    methods: {
        // 点击右上角 与周围mask时候关闭页面
        close() {
            this.$emit("changeDialogFormVisible");
        },
        // 对话框取消按钮
        closeResetPW() {
            this.$emit("changeDialogFormVisible");
        },
        // 对话框确定按钮
        changePassword() {
            this.$refs["changePw"].validate(async v => {
                if (v) {
                    if (this.form.oldPW === this.form.newPW) {
                        Message.error("新密码与旧密码不能一样");
                        return;
                    } else {
                        let { oldPW, newPW } = this.form;
                        let data = {
                            oldpass: oldPW,
                            newpass: newPW
                        };
                        let result = await reqChangePassword(data);
                        if (result.succeed) {
                            Message.success("密码修改成功");
                            this.form.oldPW = "";
                            this.form.newPW = "";
                            this.$emit("changeDialogFormVisible");
                        } else {
                            Message.error("密码修改失败");
                        }
                    }
                }
            });
        }
    },

    components: {}
};
</script>
<style lang='less' scoped>
</style>