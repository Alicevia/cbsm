<template>
  <div class="intention">
    <h2>意向用户</h2>
    <TableDisplay :trData="applyServiceUserList" :currentPage="currentPage" :thData="thData">
      <template slot-scope="slot">
        <!-- rowspan -->
        <tr
          v-for="(item) in slot.data[currentPage]"
          :key="item.id"
          @click.stop="receiveUserApplyService(item.id)"
        >
          <td>{{item.nickName}}</td>
          <td>{{item.company}}</td>
          <td>{{item.phone}}</td>
          <td>
            <input type="text" class="remark" :placeholder="item.remark" />
          </td>
        </tr>
        <tr v-for="(item,index) of resetTr" :key="index">
          <td>{{'-'}}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </template>
    </TableDisplay>
    <NextBtn @changePage="changePage"></NextBtn>
  </div>
</template>

<script>
import TableDisplay from "src/common/TableDisplay";
import NextBtn from "src/common/NextBtn";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      currentPage: 0,
      thData: [
        { category: "姓名", th: { width: "1.4rem" } },
        { category: "公司", th: { width: "3rem" } },
        { category: "电话", th: { width: "1.5rem" } },
        { category: "备注", th: { width: "2.16rem" } }
      ]
    };
  },

  computed: {
    ...mapState(["applyServiceUserList"]),
    // 获取到最大页数
    maxPages: {
      get() {
        return this.applyServiceUserList.length;
      }
    },
    // 计算没有填充的行数
    resetTr() {
      let { applyServiceUserList, currentPage } = this;
      if (!applyServiceUserList[currentPage]) {
        applyServiceUserList[currentPage] = [];
      }
      let reset = 3 - applyServiceUserList[currentPage].length;

      return reset;
    }
  },

  mounted() {},

  methods: {
    ...mapActions(['getUserAudit','getActiveIntentionUserId']),
    // 上下翻页
    changePage(type) {
      let { currentPage, maxPages } = this;
      if (type === "add") {
        if (currentPage === maxPages) {
          Message.warning("已经是最后一页");
          return;
        }
        this.currentPage++;
      } else {
        if (currentPage <= 0) {
          Message.warning("已经第一页了");
          return;
        }
        this.currentPage--;
      }
    },
    receiveUserApplyService(id) {
      
      this.getActiveIntentionUserId({id,page:0})
      this.getUserAudit({
        userId:id,
        size:999,
        ExamineType:'UNAUDITED'
      })

    }
  },

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