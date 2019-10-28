<template>
  <div class="admin home-right-common">
    <h2 class="title">服务管理</h2>
    <div class="admin-wrap">
     <TableDisplay  />
    </div>
  </div>
</template>

<script>
import TableDisplay from 'pages/Home/Components/TableDisplay/TableDisplay'
export default {
  data () {
    return {
      // 需要加入验证
      // tableHead 需要传递给子组件
      // 子组件整体高度需要传递 可以不传
      // 合并行数需要传递


    };
  },

  computed: {},

  mounted(){},

  methods: {},

  components: {
    TableDisplay
  },
}

</script>
<style lang='less' scoped>

</style>