<template>
  <div class="service-manage home-right-common">
    <h2 class="title">服务管理</h2>
    <div class="service-manage-wrap">
      <ServiceLabel ref="serviceLabel" :labelObj='groupInformation' />
      <ServiceItem :serviceAry='showCurrent'></ServiceItem>
      <Pagination class="service-pag"></Pagination>
    </div>
  </div>
</template>

<script>
import ServiceLabel from './ServiceLabel'
import ServiceItem from './ServiceItem'
import Pagination from './Pagination'
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
    this.getGroupInfo().then(()=>{
      this.$refs['serviceLabel'].initGroupItemInfo({ id: 1 });
    })
  },
  mounted(){

  },

  methods: {
    ...mapActions(['getGroupInfo']),

  },

  components: {
    ServiceLabel,ServiceItem,Pagination
  },
}

</script>
<style lang='less' scoped>
.service-manage{
  position: relative;
  height: 8.5rem;

}
.service-pag {
  position: absolute;
  bottom: .3rem;
  left: 0;
  right: 0;
}

</style>