<template>
  <div class="wx-manage home-right-common">
    <h2 class="title">微信管理</h2>
    <LabelRouter :routerObj="routerObj"/>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import LabelRouter from "src/common/LabelRouter";

export default {
  data() {
    return {
      routerObj: [
        { path: "/home/wx/public", title: "公众号设置" },
        { path: "/home/wx/menus", title: "自定义菜单" },
        {path:'/home/wx/usermanage',title:'用户管理'}
      ],
      path:'/home/wx/public'
    };
  },

  computed: {},
  watch: {},
  created() {
    // reqUserInfo()
  },
  mounted() {},
  activated() {
    let vm = this
      vm.$router.push(vm.path)


  },
  // beforeRouteEnter(to,from,next){
  //   console.log('2')
  //   next(vm=>{
  //   })
  // },
  beforeRouteLeave(to,from,next){
    this.path = this.$route.path
    next()
  },
  methods: {},

  components: {
    LabelRouter
  }
};
</script>
<style lang='less' scoped>
.wx-manage {
  height:8rem;
}
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