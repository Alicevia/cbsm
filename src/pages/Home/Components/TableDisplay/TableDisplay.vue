<template>
  <!-- 1,tab的外层包裹高度需要父级传递 -->
  <div :style='tabWrapHeight'>
  <table 
   class="table-show" 
   cellspacing="0" 
   cellpadding="0" 
   border="1">
    <thead class="table-th">
      <tr>
        <th v-for="(item,index) in thData" :key="index" 
        :style="item.th">{{item.category}}</th>
        <!-- <th :style='th'>姓名</th>
        <th >公司名称</th>
        <th>电话</th>
        <th>备注</th>-->
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>王宇</td>
        <td>小米公司</td>
        <td>15579958465</td>
        <td>
          <input class="remark" type="text" placeholder="备注" />
        </td>
      </tr>
    </tbody>
  </table>
  </div>

</template>
<script>
export default {
  data() {
    return {
      thClass: {
        th1: { width: "1.4rem" },
        th2: { width: "3rem" },
        th3: { width: "1.5rem" },
        th4: { width: "2.6rem" }
      },
      thData: [
        { category: "姓名", th: { width: "1.4rem" } },
        { category: "公司", th: { width: "3rem" } },
        { category: "电话", th: { width: "1.5rem" } },
        { category: "备注", th: { width: "2.16rem" } }
      ],
      tabWrapHeight:{
        height:'2rem'
      }
    };
  },

  computed: {},

  mounted() {},

  methods: {},

  components: {}
};
</script>
<style lang='less' scoped>
.table-show {
  width: 8rem;
  border: 1px solid #e5e5e5;
  border-collapse: collapse;
  .table-th {
    line-height: 0.5rem;
    background-color: #00b7c5;
    text-align: center;
    color: white;
    font-size: 0.18rem;
  }
  .remark {
    text-align: center;
    background-color: #fff;
  }
  td {
    text-align: center;
    line-height: 0.5rem;
  }
}
</style>