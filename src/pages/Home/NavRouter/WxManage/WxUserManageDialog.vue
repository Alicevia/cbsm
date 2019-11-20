<template>
  <div>
    <el-dialog title="发送客服消息" :visible.sync="dialogFormVisible" center>
      <el-form :model="message" label-width="18%" label-position="right">
        <el-form-item label="消息内容">
          <el-input type="textarea" v-model="content" placeholder="只有48小时内给公众号发送过消息的粉丝才能接收到信息"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="message.nickname" disabled></el-input>
        </el-form-item>
        <el-form-item label="微信用户openid">
          <el-input v-model="message.openid" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleMessageDialog">取 消</el-button>
        <el-button type="primary" @click="sendMessage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { reqSendMessageToUser } from "src/api";
export default {
  props: {
    message: {
      type: Object
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      content: ""
    };
  },

  computed: {},

  mounted() {},

  methods: {
    // 显示与隐藏给用户发消息的窗口
    toggleMessageDialog() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    // 给用户发消息
    async sendMessage() {
      let content = this.content;
      if (content.trim() === "") {
        Message.warning("请填写要发送的信息");
        return;
      }
      let data = {
        touser: this.message.openid,
        msgtype: "text",
        text: {
          content
        }
      };
      let result = await reqSendMessageToUser(data);
      if (result.data.errcode === 0) {
        Message.success("信息发送成功");
        this.content=''
        this.toggleMessageDialog();

      } else {
        Message.error("信息发送失败");
        this.content=''
        this.toggleMessageDialog();

      }
    }
  },

  components: {}
};
</script>
<style lang='less' scoped>
</style>