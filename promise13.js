// 声明构造函数
function Promise(executer) {
	// 添加属性
	this.PromiseState = 'pending';
	this.PromiseResult = null;

	// 声明属性存储回调
	this.callbacks=[];

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
      	// if(_this.callback.onResolved){
      	// 	_this.callback.onResolved(data)	
      	// }
      	_this.callbacks.forEach(item=>{
      		item.onResolved(data)
      	})
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
      	// if(_this.callback.onRejected){
      	// 	_this.callback.onRejected(data)	
      	// }
      	_this.callbacks.forEach(item=>{
      		item.onRejected(data)
      	})
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
	const _this = this

	// 判断回调函数参数-->异常穿透
	if(typeof onRejected !== 'function'){
		onRejected = reson=>{
			throw reson;
		}
	}

	// 判断回调函数参数-->值传递
	if(typeof onResolved !== 'function'){
		onResolved = value => value;
	}
	return new Promise((resolve,reject)=>{
		// 封装函数
		function callback(OnType){
			try{
				//获取回调函数的执行结果
				const res = OnType(_this.PromiseResult)
	
				//判断
				if(res instanceof Promise){
    	        	// 如果是 Promise类型的对象
    	        	res.then(v=>{
    	            	resolve(v)
    	        	},r=>{
    	            	reject(r)
    	        	})
				}else{
					// 结果的对象状态为[成功]
					resolve(res)
				}
			}catch(e){
				reject(e)
			}
		}
		//调用回调函数
		if(this.PromiseState === 'fulfilled'){
			callback(onResolved)
		}
	
		if(this.PromiseState === 'rejected'){
			callback(onRejected)
		}
	
		// 判断pending状态
		if(this.PromiseState === 'pending'){
    		// 保存回调函数
    		this.callbacks.push({
    			onResolved:function(){
					callback(onResolved)
    			},
    			onRejected:function(){					
					callback(onRejected)
    			}
    		})
		}
	})
}

// 添加catch方法
Promise.prototype.catch=function(onRejected){
	return this.then(undefined,onRejected);
}

// 添加resolve方法
Promise.resolve=function(value){
	return new Promise((resolve,reject)=>{
		if(value instanceof Promise){
        	value.then(v=>{
        		resolve(v);
        	},r=>{
        		reject(r);
        	})
		}else{
			resolve(value);
		}
	})
}