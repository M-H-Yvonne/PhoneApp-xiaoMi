$.extend({
	myAjax: function(userOptions) {
		//构造默认配置
		var defaultOptions = {
			type: "get",
			headers: {
				//不能放在函数外，token每次都需要获得
				"Authorization": sessionStorage.getItem('token'),
				"Content-Type": "application/json"
			}
		};
		//合并默认配置和用户配置
		var options = Object.assign({}, defaultOptions, userOptions);
		if (options.data) options.data = JSON.stringify(options.data);
		options.success = function(result) {
			console.log(result)
			if (result.code == 200) {
				userOptions.success(result.data);
			} else {
				alert(result.msg);
			}
		}
		//发真正的ajax
		$.ajax(options);
	},
	
	/* 防抖 */
	debounce:function( func, wait){
		var lock=false;
		return function(args){
			if(lock) return;
			lock=true;
			setTimeout(function(){lock=false},wait);
			func.call(this,args);
		}
	}
})