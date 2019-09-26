<template>
  <div id="app">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>

export default {
  data () {
    return {
    };
  },


  computed: {},

  mounted(){},

  methods: {},
  components: {
      
  },

}

</script>
<style lang='less'>
    @import '~src/assets/css/reset.less'; 
    @import '~src/assets/css/common.less';
    @import './assets/iconfont/iconfont.css';
    html {
        font-size: 100px;
        width: 100%;
        height: 100%;
        font-family: 'Microsoft YaHei'
    }
    body {
        width: 100%;
        height: 100%;

    }
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
   
</style>