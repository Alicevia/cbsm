<template>
  <div>
    <ul class="service-category">
      <li v-for="item in labelObj" :key="item.id"
      @click="receiveGroupItemInfo(item.id)"
        class="service-category-item"
      >{{item.groupName}}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props:{
    labelObj:{
      type:Array,
      required:true,
    }
  },
  data() {
    return {};
  },

  computed: {
    // ...mapGetters([])
  },

  mounted() {},

  methods: {
    ...mapActions(['getGroupItemInfo']),
        receiveGroupItemInfo(id){
      
      this.getGroupItemInfo({id,page:1})
    }
  },

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