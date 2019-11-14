import utils from 'src/utils'
export default {
  currentTableList(state,getters){
    return ()=>{

    }
  },
  allAttentionFormated(state){
    let {allAttentionUserList} =state
    return utils.changeAry(allAttentionUserList,8)
    
  }
  

}