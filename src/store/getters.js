import utils from "src/utils"

export default {
    // pages(state,getters){
    //     let {iconList} = state
    //     let pages = []
    //     iconList.forEach((item,index)=>{
 
    //          let page = Math.floor(index/8)
    //          if (!pages[page]) {
    //              pages[page] =[]
    //          }
    //          pages[page].push(item)
    //     })
    //     return pages
    //  },
    bindPhone(state){
        let {userInfo} = state
        return userInfo.phone?false:true
    },
    aliMessage(state){
        let aliId = state.aliId
        return aliId?false:true
    },
    //根据获取到的设备分组类别生成对象
    // groupItemInfos(state){
    //   let groupItemInfo = state.groupInformation
    //   return groupItemInfo.map((item,index)=>{
    //     return {[item.groupName]:[]}
    //   })

    // }
    // 服务管理页面-----------------------------------
    //验证是否需要发送请求获取数据 
    checkLocalServiceData(state){
      let {activeServiceInfo,groupInformation} = state
      let {id,page,index} = activeServiceInfo
      let othersPage = groupInformation.filter(item=>{
        if (!item.allPage) {
          item.allPage={}
        }
        return item.id===id && item.allPage[page]
      })
      let firstPage = groupInformation[index].allPage[0]

      return {othersPage,firstPage}
    },

    // 获取当前展示的服务种类最大数目
    getMaxService(state){
      let {activeServiceInfo,groupInformation} = state
      let maxPage
      groupInformation.forEach(item=>{
        if (item.id===activeServiceInfo.id) {
          maxPage = item.total
          
        }
      })
      return maxPage
    },


    // 用户管理页面------------------------------
    // 待审核的请求优化
    CheckLocalAudit(state){
      let {activeIntentionUser,allAuditService} = state
      let {id} = activeIntentionUser
      return allAuditService[id]
    },
    //全部服务表格中及时显示的数据 对要展示的全部服务进行数组的二维化
    allCurrentAudit(state){
      let ary
      let {activeIntentionUser,allServiceDevice} = state
      let {id} = activeIntentionUser
      ary = utils.changeAry(allServiceDevice[id],3)
      return ary
    },
    // 全部服务：检查要请求的东西是否在本地
    checkLocalAllService(state){
      let {activeIntentionUser,allServiceDevice} = state
      // let flag
      let {id} = activeIntentionUser
      return allServiceDevice[id]
    },
    // 微信自定义菜单页面-----------------------------
    // 计算用户还可以生成几个父菜单
    resetParentMenuNum(state){
      let {weChatMenus,weChatOriginMenus} = state
      let length = weChatOriginMenus.length
      return 3-length
    },
    // 根据用户在凝聚的菜单中获取到他的父菜单
    // userParentMenu(state){
    //   let {weChatMenus,weChatOriginMenus} = state

    // }
    
}