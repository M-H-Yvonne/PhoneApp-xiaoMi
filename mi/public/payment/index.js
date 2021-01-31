
$('.icon-back').click(function(){
	//询问框
	  layer.open({
	    content: '您确定要离开本页面吗？'
	    ,btn: ['确定', '继续支付']
	    ,yes: function(index){
	      location.replace('/myOrder/index.html');
	      layer.close(index);
	    }
	  });
})

$('.pay i img').click(function(){
	if($(this).parents('li').hasClass('active'))return;
	$(this).attr('src','payment-ph4.png')
	$(this).parents('li').addClass('active').siblings($('div.active')).removeClass('active')
	.find('.pay i img')
	.attr('src','payment-ph2.png');
})

var orderId=sessionStorage.getItem('orderNum')
$.myAjax({
	url:`/order/account/${orderId}`,
	success:data => {
		$(`
			<span>￥${data}.00</span>
		`).prependTo('.price')
	}
})


var t=1*60;
var minute=0
var second=0
var time=setInterval(function(){
	if(t>=0){
		minute=parseInt(t/60);
		second=parseInt(t-minute*60);
		t--;
		if(second<=9){
			second='0'+second;
		}
		if(minute<=9){
			minute='0'+minute;
		}
		$('.Timer').html(minute+'分钟'+second+'秒');
	}else{
		clearInterval(time)
		layer.open({
			content: '您已超时'
			,skin: 'msg'
			,time: 2 //2秒后自动关闭
		});
		$('.page-footer button').addClass('close')
		.css({
			'background':'#f4f4f4',
			'color':'#999'
		})
	}
	
},1000)

$('.page-footer button').click(function(){
	if($('.page-footer button').hasClass('close'))return
	$.myAjax({
		url:`/order/pay/${orderId}`,
		success:data => {
			//提示
			layer.open({
				content: '您已成功支付，即将离开该界面'
				,skin: 'msg'
				,time: 2 //2秒后自动关闭
			});
			setInterval(function(){
				location.assign('/myOrder/index.html')
			},3000)
		}
	})
})



