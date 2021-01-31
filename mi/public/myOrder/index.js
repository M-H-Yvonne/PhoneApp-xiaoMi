
$('.icon-back').click(function(){
	location.assign('/profile/index.html')
})




$('.title-select').on('click','li',function(){
	if($(this).hasClass('active'))return
	$(this).addClass('active').siblings('.active').removeClass('active');
	$('.orders>div').eq($(this).index()).addClass('active').siblings('.active').removeClass('active');
});




//全部订单
$.ajax({
	url:'/order/list_all',
	type:'get',
	headers:{
		"Authorization":sessionStorage.getItem('token')
	},
	success:result => {
		console.log(result)
		if(result.code===200){
			//是否有订单
			if(result.data.length===0){
				$('.empty.whole').css('display','flex');
				$('.have.all').css('display','none');
			}else{
				$('.empty.whole').css('display','none');
				$('.have.all').css('display','block');
				
				//如果有订单
				result.data.forEach(function(item,i){
					$(`
						<ul data-orderid='${item.orderId}' data-pay='${item.pay}'>
							<li class='goods-title clearfix'>
								<div class='goods-title_shop'>
									<img src="myOeder-ph2.png" alt="">
									<span>小米自营</span>
								</div>
								<div class='paytype'></div>
							</li>
							<li class='goods'></li>
							<li class='total'>
								<span>共<i>${item.details.length}</i>件商品，总金额 ￥<b>${item.account}</b>.00</span>
							</li>
							<li class='act clearfix'>
								<span class='del'>删除订单</span>
								<button type="button">再次购买</button>
							</li>
							<li class='time'>
								<span>${item.orderTime}</span>
							</li>
						</ul>
					`).appendTo('.all')
					item.details.forEach(function(item1){
						$(`
							<div>
								<div class='goods_img'>
									<img src="${item1.avatar}" />
								</div>
								<div>
									<span>${item1.name}</span>
								</div>
								<div class='goods_num'>
									<span>￥${item1.price}</span>
									<span>x${item1.count}</span>
								</div>
							</div>
						`).appendTo($('.goods')[i])
					})
					
				})
				changePayType()
				delOrder();
			}
		}else{
			alert(result.msg);
		}
	}
})


//未付款订单
$.myAjax({
	url:'/order/list_unpay',
	success: data => {
		if(data.length===0){
			$('.empty.waitpay').css('display','flex');
			$('.have.waitpay').css('display','none');
		}else{
			$('.empty.waitpay').css('display','none');
			$('.have.waitpay').css('display','block');
			
			//如果有订单
			data.forEach(function(item,i){
				$(`
					<ul data-orderid='${item.orderId}' data-pay='${item.pay}'>
						<li class='goods-title clearfix'>
							<div class='goods-title_shop'>
								<img src="myOeder-ph2.png" alt="">
								<span>小米自营</span>
							</div>
							<div class='paytype'></div>
						</li>
						<li class='goods'></li>
						<li class='total'>
							<span>共<i>${item.details.length}</i>件商品，总金额 ￥<b>${item.account}</b>.00</span>
						</li>
						<li class='act clearfix'>
							<span class='del'>删除订单</span>
							<button type="button">去支付</button>
						</li>
						<li class='time'>
							<span>${item.orderTime}</span>
						</li>
					</ul>
				`).appendTo('.have.waitpay')
				item.details.forEach(function(item1){
					$(`
						<div>
							<div class='goods_img'>
								<img src="${item1.avatar}" />
							</div>
							<div>
								<span>${item1.name}</span>
							</div>
							<div class='goods_num'>
								<span>￥${item1.price}</span>
								<span>x${item1.count}</span>
							</div>
						</div>
					`).appendTo($('.have.waitpay .goods')[i])
				})
				
			})
			changePayType()
			delOrder();
		}
	}
})

//已付款订单

$.myAjax({
	url:'/order/list_pay',
	success: data => {
		if(data.length===0){
			$('.empty.noreceive').css('display','flex');
			$('.have.noreceive').css('display','none');
		}else{
			$('.empty.noreceive').css('display','none');
			$('.have.noreceive').css('display','block');
			
			//如果有订单
			data.forEach(function(item,i){
				$(`
					<ul data-orderid='${item.orderId}' data-pay='${item.pay}'>
						<li class='goods-title clearfix'>
							<div class='goods-title_shop'>
								<img src="myOeder-ph2.png" alt="">
								<span>小米自营</span>
							</div>
							<div class='paytype'></div>
						</li>
						<li class='goods'></li>
						<li class='total'>
							<span>共<i>${item.details.length}</i>件商品，总金额 ￥<b>${item.account}</b>.00</span>
						</li>
						<li class='act clearfix'>
							<span class='del'>删除订单</span>
							<button type="button">再次购买</button>
						</li>
						<li class='time'>
							<span>${item.orderTime}</span>
						</li>
					</ul>
				`).appendTo('.have.noreceive')
				item.details.forEach(function(item1){
					$(`
						<div>
							<div class='goods_img'>
								<img src="${item1.avatar}" />
							</div>
							<div>
								<span>${item1.name}</span>
							</div>
							<div class='goods_num'>
								<span>￥${item1.price}</span>
								<span>x${item1.count}</span>
							</div>
						</div>
					`).appendTo($('.have.noreceive .goods')[i])
				})
				
			})
			changePayType()
			delOrder();
		}
	}
})



function changePayType(){
	for(var i=0;i<$('.have ul').length;i++){
		if($('.have ul')[i].dataset.pay==='0'){
			$($('.have ul')[i]).find('.paytype').text('未付款');
			$('.act button').text('去支付')
		}else if($('.have ul')[i].dataset.pay==='1'){
			$($('.have ul')[i]).find('.paytype').text('已付款');
		}
	}
}



function delOrder(){
	$('.del').click(function(){
		var id=$($(this).parents('ul'))[0].dataset.orderid;
		var $this=$(this)
		var nodeHave=$($this).parents('ul').parent('div.have');
		var nodeEmpty=$($this).parents('ul').parent('div.have').siblings('.empty');
		//弹窗
		$('.popup').css('display','block');
		$('.login').click(function(){
			// for(var i=0;i<$('.have ul').length;i++){
			// 	if(id==$('.have ul')[i].dataset.orderid){
			// 		// console.log($('.have ul')[i])
			// 		$('.have ul')[i].remove()
			// 	}
			// }
			$('.popup').css('display','none');
			
			
			
			
			
			// console.log($this.parents('div.box').find('div.empty'))
			if($(nodeHave).find('ul').length==0){
				console.log($(nodeEmpty))
				$(nodeEmpty).css('display','flex');
				$(nodeHave).css('display','none');
			}else{
				$(nodeEmpty).css('display','none');
				$(nodeHave).css('display','block');
			}
			
			
			$.myAjax({
				url:`/order/remove/${id}`,
				success:data => {
					for(var i=0;i<$('.have ul').length;i++){
						if(id==$('.have ul')[i].dataset.orderid){
							// console.log($('.have ul')[i])
							$('.have ul')[i].remove()
						}
					}
				}
			});
		})
		$('.closeDetailLogin').click(function(){
			$('.popup').css('display','none');
		})
		
				
						
			
		
		
	})
	
}


