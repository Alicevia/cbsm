<template>
  <div class="admin home-right-common">
    <h2 class="title">用户管理</h2>
    <div class="admin-wrap">
      <div class="intention">
        <h2>意向用户</h2>
        <TableDisplay :trData="trData">
          <template slot-scope="slot">
            <!-- rowspan -->
            <tr v-for="(item,index) in slot.data" :key="index">
              <td>{{item.name}}</td>
              <td>{{item.company}}</td>
              <td>{{item.phone}}</td>
              <td>
                <input type="text" class="remark" :placeholder="item.bz" />
              </td>
            </tr>
          </template>
        </TableDisplay>
        <NextBtn></NextBtn>
      </div>
            <div class="intention">
        <h2>待审核</h2>
        <TableDisplay :trData="trData">
          <template slot-scope="slot">
            <tr v-for="(item,index) in slot.data" :key="index">
              <td>{{item.name}}</td>
              <td>{{item.company}}</td>
              <td>{{item.phone}}</td>
              <td>
                <input type="text" class="remark" :placeholder="item.bz" />
              </td>
            </tr>
          </template>
        </TableDisplay>
        <NextBtn></NextBtn>
      </div>
            <div class="intention">
        <h2>全部用户</h2>
        <TableDisplay :trData="trData">
          <template slot-scope="slot">
            <tr v-for="(item,index) in slot.data" :key="index">
              <td>{{item.name}}</td>
              <td>{{item.company}}</td>
              <td>{{item.phone}}</td>
              <td>
                <input type="text" class="remark" :placeholder="item.bz" />
              </td>
            </tr>
          </template>
        </TableDisplay>
        <Pagination></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import TableDisplay from "src/common/TableDisplay"
import NextBtn from 'src/common/NextBtn'
import Pagination from 'src/common/Pagination'
export default {
  data() {
    return {
      // 需要加入验证
      // tableHead 需要传递给子组件
      // 子组件整体高度需要传递 可以不传
      // 合并行数需要传递
      trData: [
        { name: "wangyu", company: "小米", phone: "3544135413", bz: "打电话" },
        { name: "wangyu3", company: "小米", phone: "3544135413", bz: "打电话" },
        { name: "wangyu2", company: "小米", phone: "3544135413", bz: "打电话" },

      ]
    };
  },

  computed: {},

  mounted() {},

  methods: {},

  components: {
    TableDisplay,NextBtn,Pagination
  }
};
</script>
<style lang='less' scoped>
.admin-wrap {
  .intention {
    h2 {
      color: #373D41;
      font-size: .18rem;
      text-decoration: underline;
      margin-bottom: .1rem;
    }
  }
}
</style>