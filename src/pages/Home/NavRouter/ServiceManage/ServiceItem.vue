<template>
  <div class="service-wrap">
    <div class="service-description">
      <div class="category">设备种类</div>
      <div class="time">服务状态</div>
      <div class="operate">操作</div>
    </div>
    <ul class="service-show">
      <li class="service-item" v-for="(item) in serviceAry" :key="item.id">
        <div class="item-icon">
          <img :src="item.serverPicture" alt />
        </div>
        <div class="item-title">
          <h2>{{item.name}}</h2>
          <p>{{item.content}}</p>
        </div>
        <div class="item-state">
          <span class="past"></span>
          <span>{{item.expirationDate}}</span>
        </div>
        <div class="item-operation">
          <el-button
            class="btn"
            :type="btnColor(item.status)"
            :disabled="item.status===0?false:true"
            size="small"
          >{{opreateStatus(item.status)}}</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    serviceAry: {
      type: Array
    }
  },
  data() {
    return {};
  },

  computed: {
    opreateStatus: function(status) {
      return status => {
        switch (status) {
          case 0:
            return "开通";
            break;
          case 1:
            return "审核未通过";
            break;
          case 2:
            return "正在审核";
            break;
          case 3:
            return "已开通";
            break;
          default:
            return "已过期";
        }
      };
    },
    btnColor(status) {
      return (status) => {
        switch (status) {
          case 0:
            return "primary";
            break;
          case 1:
            return "danger";
            break;
          case 2:
            return "warning";
            break;
          case 3:
            return "success";
            break;
          default:
            return "info";
        }
      };
    }
    // timeStatus(status)
  },

  mounted() {},

  methods: {},

  components: {}
};
</script>
<style lang='less' scoped>
.service-wrap {
  .service-description {
    display: flex;
    font-size: 0.16rem;
    font-weight: bold;
    text-align: center;
    height: 0.5rem;
    line-height: 0.5rem;
    color: white;
    background-color: #00b7c5;
    .category {
      width: 5rem;
      border-right: 1px solid white;
    }
    .time {
      width: 1.6rem;
      text-align: center;
      border-right: 1px solid white;
    }
    .operate {
      width: 1.2rem;
      text-align: center;
    }
  }
  .service-show {
    .service-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: 0 0.4rem;
      padding-right: 0;
      height: 0.6rem;
      background-color: #ddf8ff;
      border-top: 1px solid white;
      box-sizing: border-box;
      // &:first-child{
      //   border: none;
      // }
      &:hover {
        background-color: #e4eef1;
      }
      .item-icon {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 0.04rem;
        background-color: #fff;
        img {
          display: block;
          margin-left: 0.02rem;
          margin-top: 0.02rem;
          width: 0.36rem;
          height: 0.36rem;
        }
      }
      .item-title {
        width: 3.95rem;
        padding-left: 0.15rem;
        h2 {
          color: #373d41;
          font-size: 0.14rem;
          font-weight: bold;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #7c7c7c;
          font-size: 0.12rem;
        }
      }
      .item-state {
        width: 1.9rem;
        box-sizing: border-box;
        text-align: center;
        padding-right: 0.15rem;
        .past {
          color: red;
        }

        // flex: 2;
      }
      .item-operation {
        // flex: 1;
        width: 1rem;
        .btn {
          display: inline;
        }
        text-align: center;
      }
    }
  }
}
</style>