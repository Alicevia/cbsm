<template>
  <div class="avatar">
      <img class="avatar-img" :src="userInfo.headPicture" alt="">
      <h2 class="avatar-name">{{userInfo.nickName?userInfo.nickName:'小红'}}</h2>
      <p class="avatar-device">{{userInfo.number}}个智能设备</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data () {
    return {
    };
  },

  computed: {
      ...mapState(['userInfo'])
  },

  mounted(){},

  methods: {},

  components: {},
}

</script>
<style lang='less' scoped>
    .avatar {
        width: 100%;
        text-align: center;
        // margin: 0rem 1rem .14rem;
        .avatar-img {
            display: inline-block;
            border-radius: 50%;
            width: 1rem;
            height: 1rem;
            background-color: #fff;
            // background-image: url('http://img.cluster-dt.com/avatar.a331aa0.jpg');
            background-size: cover;
            background-repeat: no-repeat;
        }
        .avatar-name {
            font-size: .18rem;
            margin: .15rem 0;
            color: #010101;
            
        }
        .avatar-device {
            font-size: .16rem;
            color:#7D7D7D;
        }
    }
</style>