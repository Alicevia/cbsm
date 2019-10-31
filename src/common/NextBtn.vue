<template>
  <div class="next-btn">
      <el-button  size="mini" @click="prevPage">上一页</el-button>
      <el-button  size="mini" @click="nextPage">下一页</el-button>
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

  methods: {
    prevPage(){
      this.$emit('changePage')
    },
    nextPage(){
      this.$emit('changePage','add')

    }


  },

  components: {},
}

</script>
<style lang='less' scoped>
.next-btn{
  width: 100%;
  text-align: right;
  margin-top: .2rem;
}
</style>