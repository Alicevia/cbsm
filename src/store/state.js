export default {
  userToken: '',
  userInfo: {},
  weChatInfo: {},
  aliId: '',
  aliMessageInfo: {},

  groupInformation: [],
  showCurrent:[],//当前服务管理渲染的所有数据
  activeServiceInfo:{//当前选中的请求配置
    id:0,
    index:0,
    page:0,
    size:9
  },


  applyServiceUserList:[],//意向用户列表
  activeIntentionUser:{},//选中的意向用户

  currentAudit:[], //当前渲染的待审核
  // selectAuditService:{},//需要处理的那一个待审核 待审核的id 待审核的页数
  allAuditService:{},//所有的待审核

  allServiceDevice:{},//所有服务
  //allCurrentAudit:[]//全部服务表格的 当前显示
  

  
}