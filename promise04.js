// 声明构造函数
function Promise(executer) {
	// 添加属性
	this.PromiseState = 'pending'
	this.PromiseResult = null
	// 保存实例对象的this值
	const _this = this
	// resolve 函数
	function resolve(data){
       // 1.修改对象的状态(PromiseState)
       _this.PromiseState = 'fulfilled' //resolved
       // 2.设置对象的结果值(PromiseResult)
       _this.PromiseResult = data
	}
	// reject函数
	function reject(data){
 // 1.修改对象的状态(PromiseState)
       _this.PromiseState = 'rejected' 
       // 2.设置对象的结果值(PromiseResult)
       _this.PromiseResult = data
	}
	try{
		// 同步调用[执行器函数]
      	executer(resolve,reject)
      }catch(e){
      	// 修改Promise对象的状态为[失败]
      	reject(e);
      }
}
// 添加then方法

Promise.prototype.then=function(onResolved,onRejected){}