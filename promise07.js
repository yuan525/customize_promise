// 声明构造函数
function Promise(executer) {
	// 添加属性
	this.PromiseState = 'pending';
	this.PromiseResult = null;

	// 声明属性存储回调
	this.callback={};

	// 保存实例对象的this值
	const _this = this;

	


	// resolve 函数
	function resolve(data){
      	// 判断状态
      	if(_this.PromiseState !== 'pending') return;

      	// 1.修改对象的状态(PromiseState)
      	_this.PromiseState = 'fulfilled' //resolved

      	// 2.设置对象的结果值(PromiseResult)
      	_this.PromiseResult = data

      	// 调用成功的回调函数
      	if(_this.callback.onResolved){
      		_this.callback.onResolved(data)	
      	}
	}

	// reject函数
	function reject(data){
		// 判断状态
      	if(_this.PromiseState !== 'pending') return;

 		// 1.修改对象的状态(PromiseState)
      	_this.PromiseState = 'rejected' 

      	// 2.设置对象的结果值(PromiseResult)
      	_this.PromiseResult = data

      	// 调用失败的回调函数
      	if(_this.callback.onRejected){
      		_this.callback.onRejected(data)	
      	}
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
Promise.prototype.then=function(onResolved,onRejected){
	//调用回调函数
	if(this.PromiseState === 'fulfilled'){
		onResolved(this.PromiseResult)
	}

	if(this.PromiseState === 'rejected'){
		onResolved(this.PromiseResult)
	}

	// 判断pending状态
	if(this.PromiseState === 'pending'){
    	// 保存回调函数
    	this.callback={
    		onResolved,
    		onRejected
    	}
	}
}