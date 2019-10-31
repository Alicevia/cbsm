<template>
  <!-- 1,tab的外层包裹高度需要父级传递 -->
  <div :style='tabWrapHeight' class="table-wrap">
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
    <tbody class="tbody">
      <!-- <tr v-for="(item,index) in trData" :key="index">
        <td>{{item.name}}</td>
        <td>{{item.company}}</td>
        <td>{{item.phone}}</td>
        <td>
          <slot></slot>
          <input class="remark" type="text" :placeholder="item.bz" />
        </td>
      </tr> -->
      <slot :data='trData' :currentPage='currentPage'></slot>


    </tbody>
  </table>
  </div>

</template>
<script>
export default {
  props:['trData','thData','currentPage'],
  data() {
    return {
      thClass: {
        th1: { width: "1.4rem" },
        th2: { width: "3rem" },
        th3: { width: "1.5rem" },
        th4: { width: "2.6rem" }
      },

      tabWrapHeight:{
        height:'1.5rem'
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
.table-wrap {
  margin-top: -.06rem;
}
.table-show {
  width: 8rem;
  border: 1px solid #e5e5e5;
  border-collapse: collapse;
 
  .table-th {
    line-height: 0.4rem;
    background-color: #00b7c5;
    text-align: center;
    color: white;
    font-size: 0.16rem;
    // font-weight: 1000;
  }
  // .tbody::-webkit-scrollbar {
  //         display: none
  //     }
  .tbody {
    tr {
      line-height: 0.4rem;
      &:hover {
        background-color: #DDF8FF;
        .remark {
          background-color: #DDF8FF;
        }
      }
    }
  }
  .remark {
    text-align: center;
    background-color: #fff;
  }
  td {
    text-align: center;
    line-height: 0.4rem;
  }
}
</style>