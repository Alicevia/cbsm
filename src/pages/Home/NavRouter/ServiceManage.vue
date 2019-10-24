<template>
  <div class="service-manage home-right-common">
    <h2 class="title">服务管理</h2>
    <div class="service-manage-wrap">
      <ServiceCategory :routerObj='routerObj' />
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import ServiceCategory from 'pages/Home/Components/ServiceRouter/ServiceCategory'
export default {
  data () {
    return {
        routerObj:[
        {path:'/home/service/1',title:'item1'},
        {path:'/home/service/2',title:'item2'}
      ]
    };
  },

  computed: {},

  mounted(){},

  methods: {},

  components: {
    ServiceCategory
  },
}

</script>
<style lang='less' scoped>

</style>