<template>
  <div>
    <ul class="service-category">
      <li
        v-for="(item,index) in labelObj"
        :key="item.id"
        @click="initGroupItemInfo({id:item.id,index})"
        :class="activeClass(index)"
      >{{item.groupName}}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    labelObj: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      classIndex: "0"
    };
  },

  computed: {
    ...mapGetters(['checkLocalServiceData']),
    activeClass(index) {
      return index => {
        return this.classIndex === index
          ? "service-category-item active"
          : "service-category-item";
      };
    }
  },
  created() {
    // 初始化选中传感器类
    
  },

  mounted() {},

  methods: {
    ...mapActions(["getGroupItemInfo", "saveServiceInfo",'modiShowCurrent']),
    initGroupItemInfo({ id, index = 0, size = 8 }) {
      this.classIndex = index
      let serviceInfo = {id,index,page: 0,size,}
      this.saveServiceInfo(serviceInfo)
      let {firstPage} = this.checkLocalServiceData
      if (firstPage) {
        this.modiShowCurrent(firstPage)
      }else{
        this.getGroupItemInfo({ id, page: 0, size, examineType:'GROUP'})
      }
    }
  },

  components: {}
};
</script>
<style lang='less' scoped>
.service-category {
  margin-bottom: 0.2rem;
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-family: "MicrosoftYaHei";

  .service-category-item {
    margin-right: 0.4rem;
    height: 0.54rem;
    line-height: 0.54rem;
    color: #373d41;
    font-size: 0.18rem;
    box-sizing: border-box;
    border-radius: 0.04rem;
    border: 1px solid transparent;
    padding: 0 0.1rem;
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