<template>
  <div>
    <ul class="service-category">
      <router-link v-for="item in routerObj" :key="item.path"
        :to="item.path"
        tag="li"
        class="service-category-item"
      >{{item.title}}</router-link>
    </ul>
  </div>
</template>

<script>
//import ServiceCategoryItem from 'pages/Home/Components/ServiceManage/ServiceCategoryItem'
export default {
  props:{
    routerObj:{
      type:Array,
      required:true
    }
  },
  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {},

  components: {}
};
</script>
<style lang='less' scoped>
.service-category {
  margin-bottom: .2rem;
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-family:'MicrosoftYaHei';
  
  .service-category-item {
    margin-right: .4rem;
    height: 0.54rem;
    line-height: 0.54rem;
    color: #373d41;
    font-size: 0.18rem;
    box-sizing: border-box;
    border-radius: .04rem;
    border: 1px solid transparent;
    padding: 0 .1rem;
    &.active {
      color: #00b7c5;
      background-color: #e4eef1;
    }
    &:hover {
      border: 1px solid rgb(238, 223, 195);
    }
  }
}
</style>