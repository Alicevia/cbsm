<template>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="800px"
    :destroy-on-close='true'
    :before-close="handleClose">
        <iframe scrolling='no' width="700px" height="600px"
         src="http://www.cluster-dt.com/edu_app/auth.html" frameborder="0"></iframe>
       
    </el-dialog>
</template>

<script>
export default {
    props:{
        dialogVisible:{
            type:Boolean,
            required:true
        }
    },
  data () {
    return {
       
    };
  },

  computed: {},

  mounted(){},

  methods: {
        handleClose(done) {
        // this.$confirm('确认关闭？')
        //     .then(_ => {
        //         done();
        //     })
        //     .catch(_ => {});
            this.$emit('toggle')
        }
  },

  components: {},
}

</script>
<style lang='less' scoped>
.el-dialog {
    height: 80%;
}
</style>