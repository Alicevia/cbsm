<template>
  <div class="intention">
    <h2>意向用户</h2>
    <TableDisplay :trData="applyServiceUserList.list" :thData="thData">
      <template slot-scope="slot">
        <!-- rowspan -->
        <tr v-for="(item,index) in slot.data" :key="index">
          <td>{{item.nickName}}</td>
          <td>{{item.company}}</td>
          <td>{{item.phone}}</td>
          <td>
            <input type="text" class="remark" :placeholder="item.remark" />
          </td>
        </tr>
        <tr></tr>
        <tr></tr>
      </template>
    </TableDisplay>
    <NextBtn></NextBtn>
  </div>
</template>

<script>
import TableDisplay from "src/common/TableDisplay";
import NextBtn from "src/common/NextBtn";
import { mapState } from "vuex";
export default {
  data() {
    return {
      thData: [
        { category: "姓名", th: { width: "1.4rem" } },
        { category: "公司", th: { width: "3rem" } },
        { category: "电话", th: { width: "1.5rem" } },
        { category: "备注", th: { width: "2.16rem" } }
      ]
    };
  },

  computed: {
    ...mapState(["applyServiceUserList"])
  },

  mounted() {},

  methods: {},

  components: { TableDisplay, NextBtn }
};
</script>
<style lang='less' scoped>
.intention {
  h2 {
    color: #373d41;
    font-size: 0.18rem;
    text-decoration: underline;
    margin-bottom: 0.1rem;
  }
}
</style>