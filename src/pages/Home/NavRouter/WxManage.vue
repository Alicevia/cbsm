<template>
  <div class="wx-manage home-right-common">
    <h2 class="title">微信管理</h2>
    <ServiceCategory :routerObj="routerObj" />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import ServiceCategory from "pages/Home/Components/ServiceRouter/ServiceCategory";

export default {

  data() {
    return {
      routerObj: [
        { path: "/home/wx/public", title: "公众号设置" },
        { path: "/home/wx/menus", title: "自定义菜单" }
      ]
    };
  },

  computed: {},
  watch: {},
  created() {
    // reqUserInfo()
  },
  mounted() {},
  activated() {},

  methods: {},

  components: {
    ServiceCategory
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