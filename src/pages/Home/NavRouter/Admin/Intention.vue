<template>
  <div class="intention">
    <h2>意向用户</h2>
    <TableDisplay :trData="applyServiceUserList" :currentPage="currentPage" :thData="thData">
      <template slot-scope="slot">
        <!-- rowspan -->
        <tr
          v-for="(item,index) in slot.data[currentPage]"
          :key="item.id"
          :class="index===indexClass?'active':''"
          @click="receiveUserApplyService(item.id,index)"
        >
          <td>{{item.nickName}}</td>
          <td>{{item.company}}</td>
          <td>{{item.phone}}</td>
          <td>
            <input
              type="text"
              @blur="setRemark($event)"
              class="remark"
              :value="item.remark"
              placeholder="请设置备注"
            />
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
import { mapState, mapActions, mapGetters } from "vuex";
import { Message } from "element-ui";
import { reqEditRemark } from "src/api";
export default {
  data() {
    return {
      currentPage: 0,
      indexClass: null,
      thData: [
        { category: "姓名", th: { width: "1.4rem" } },
        { category: "公司", th: { width: "3rem" } },
        { category: "电话", th: { width: "1.5rem" } },
        { category: "备注", th: { width: "2.16rem" } }
      ]
    };
  },

  computed: {
    ...mapState(["applyServiceUserList", "activeIntentionUser"]),
    ...mapGetters(["CheckLocalAudit", "checkLocalAllService"]),
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
    ...mapActions([
      "getUserAudit",
      "saveActiveIntentionUserId",
      "modiUserRemark",
      "getAllServiceDevice",
      "updateCurrentAudit"
    ]),
    // 上下翻页
    changePage(type) {
      let { currentPage, maxPages } = this;
      if (type === "add") {
        if (currentPage + 1 >= maxPages) {
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
    // 点击获取某个用户的待审核信息
    receiveUserApplyService(id, index) {
      let page = this.currentPage;
      // 获取保存当前选中的意向用户的信息
      this.saveActiveIntentionUserId({ id, page, index });
      //验证是否需要新发请求获取某个用户下的所有待审核信息
      let auditAry = this.CheckLocalAudit;
      if (!auditAry) {
        this.getUserAudit({
          userId: id,
          size: 999,
          ExamineType: "UNAUDITED"
        });
      } else {
        this.updateCurrentAudit(auditAry);
      }
      // 获取某个用户的所有待审核信息
      this.indexClass = index;
      // 获取所某个用户的所有服务
      let allServiceAry = this.checkLocalAllService;
      if (!allServiceAry) {
        this.getAllServiceDevice({
          customerUserId:id,
          examineType: "ALL",
          size: 999
        });
      }
    },

    // 设置某个用户的备注信息
    async setRemark(e) {
      // e.stopPropagation();
      let { id, page, index } = this.activeIntentionUser;

      // let payload = {
      //   id,
      //   page,
      //   remark: e.target.value
      // };
      let result = await reqEditRemark({
        userId: id,
        remarksInformation: e.target.value
      });
      if (result.succeed) {
        this.modiUserRemark({ id, page, index, remark: e.target.value });
        Message.success("用户备注修改成功");
      } else {
        Message.error("用户备注修改失败");
      }
      // this.modiUserRemark(payload);
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
  tr {
    &.active {
      background-color: #ddf8ff;
      .remark {
        background-color: #ddf8ff;
      }
    }
  }
}
</style>