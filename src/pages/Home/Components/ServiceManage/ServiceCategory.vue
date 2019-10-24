<template>
  <div>
    <ul class="service-category">
      <router-link
        to="/home/service/1"
        tag="li"
        class="service-category-item"
      >item1</router-link>
      <router-link
        to="/home/service/2"
        tag="li"
        class="service-category-item"
      >item2</router-link>
      <router-link
        to="/home/service/3"
        tag="li"
        class="service-category-item"
      >item</router-link>
    </ul>
  </div>
</template>

<script>
//import ServiceCategoryItem from 'pages/Home/Components/ServiceManage/ServiceCategoryItem'
export default {
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
  justify-content: space-around;
  text-align: center;
  font-weight: bold;
  font-family:'MicrosoftYaHei';
  
  .service-category-item {
    width: 0.98rem;
    height: 0.54rem;
    line-height: 0.54rem;
    color: #373d41;
    font-size: 0.18rem;
    box-sizing: border-box;
    border-radius: .04rem;
    border: 1px solid transparent;
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