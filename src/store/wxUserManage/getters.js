import utils from 'src/utils'
export default {
  // 展示最新的数据
  showCurrentTableList(state){
    let {currentTableList} = state
    return utils.changeAry(currentTableList,10)
  },
  // 生成未分组
  unGroupUserList(state){
    let {allAttentionUserList} = state
    if (allAttentionUserList.length===0) {
        return []
    }
    return allAttentionUserList.filter(item=>{
      if (item.tagid_list) {
       return item.tagid_list.length===0
      }else{
        return false
      }
    })
  }

  

}