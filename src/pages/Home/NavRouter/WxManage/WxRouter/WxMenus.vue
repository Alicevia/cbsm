<template>
  <div class="wx-menus">
    <div class="wx-tip">
      <h4>操作提示</h4>
      <ul>
        <li>微信自定义菜单最多可添加3个一级菜单、5个二级菜单。</li>
        <li>微信自定义菜单分为关键词click，网址view两种类型。click是响应关键词指令，view则是直接跳转URL地址（填写绝对路径）。</li>
        <li>每次修改自定义菜单后，由于微信客户端缓存，需要24小时左右微信客户端才会显示生效。测试时可以尝试重新关注微信公众号，或者清除微信缓存。</li>
      </ul>
    </div>
  
    <CustomMenus ></CustomMenus>
    <div style="textAlign:center;marginTop:.05rem">
      <el-button type="primary" @click="createUserWxMenu">生成自定义菜单</el-button>
    </div>

  </div>
</template>
<script>
import CustomMenus from '../CustomMenus'
import Pagination from 'src/common/Pagination'
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
    };
  },

  computed: {
    ...mapState(['weChatAccessToken'])
  },
  created(){
    // this.getUserOriginalWeChatMenus({access_token:this.weChatAccessToken})
    this.getUserWeChatMenu()
  },
  mounted() {},

  methods: {
    ...mapActions(['getUserWeChatMenu']),
    createUserWxMenu(){
      // this.getCreateWxMenusFromNJ()
    }
  },

  components: {
    CustomMenus,Pagination
  }
}
</script>
<style lang='less' scoped>
.wx-menus {
  width: 100%;
  .wx-tip {
    // min-width: 10rem;
    border: 1px dashed #1b9ad5;
    padding: .1rem .3rem;
    border-radius: .1rem;
    line-height: 1.5;
    margin-bottom: .1rem;
    h4 {
      color: #1b9ad5;
      margin-left: -.1rem;
    }
  }

}
</style>