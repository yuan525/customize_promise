// 声明构造函数
function Promise(executer) {
	// resolve 函数
	function resolve(data){

	}
	// reject函数
	function reject(data){

	}
	// 同步调用[执行器函数]
    executer(resolve,reject)
}
// 添加then方法

Promise.prototype.then=function(onResolved,onRejected){}