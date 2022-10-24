import { MessageBox,Message } from 'element-ui';
 const util={
    config(text){
        return new Promise((resolve,reject)=>{
            MessageBox.confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                resolve(true)
              }).catch(() => {
                Message({
                  type: 'info',
                  message: '已取消删除'
                });      
                reject(false)    
              });
        })
    }
}
export default util
