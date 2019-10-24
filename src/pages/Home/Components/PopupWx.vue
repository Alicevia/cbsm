<template>

  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="1250px"
    :destroy-on-close="true"
    :before-close="handleClose"
  >
    <iframe
      scrolling="no"
      width="1200px"
      height="600px"
      id="auth"
      src="https://www.cluster-dt.com/h5/auth.html"
      frameborder="0"
      class="wx-auth-iframe"
    ></iframe>
  </el-dialog>


</template>

<script>
import { reqUserScanQR } from "src/api";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  },

  computed: {},

  mounted() {
    // this.getWXAuth()
  },

  methods: {
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //     .then(_ => {
      //         done();
      //     })
      //     .catch(_ => {});
      this.$emit("toggle");
    },
    async getWXAuth() {
      let result = await reqUserScanQR();
      // console.log(result)
      // debugger
      result = result.data;
      var url =
        "https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid=wx3e7ad5ac4e89de24&pre_auth_code=" +
        result +
        "&redirect_uri=http://www.cluster-dt.com/openwechat/event/success/info&auth_type=1";
      // window.location.href = url
      let auth = document.getElementById("auth");
      // console.log(auth)
      auth.src = url;
    }
  },

  components: {}
};
</script>
<style lang='less' scoped>


</style>