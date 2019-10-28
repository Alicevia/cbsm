<template>
  <div class="service-manage home-right-common">
    <h2 class="title">服务管理</h2>
    <div class="service-manage-wrap">
      <ServiceLabel :labelObj='groupInformation' />
      <ServiceItem :serviceAry='showCurrent'></ServiceItem>
    </div>
  </div>
</template>

<script>
import ServiceLabel from './ServiceLabel'
import ServiceItem from './ServiceItem'
import { mapActions, mapState } from 'vuex';
export default {
  data () {
    return {
       
    };
  },

  computed: {
    ...mapState(['groupInformation','showCurrent'])
  },
  created(){
    this.getGroupInfo()

  },
  mounted(){

  },

  methods: {
    ...mapActions(['getGroupInfo']),

  },

  components: {
    ServiceLabel,ServiceItem
  },
}

</script>
<style lang='less' scoped>

</style>