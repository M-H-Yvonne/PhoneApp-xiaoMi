
$('.icon-back').click(function(){
	location.assign('/cart/index.html');
})

var adsId;
var confirmId = sessionStorage.getItem('confirmId');

if(document.referrer=="http://localhost:3000/cart/index.html"){
	$.myAjax({
		url:'/address/get_default',
		success:function(data){
			if(data===null){
				$(`
					<div class='isnull'>
						<span>请添加送货地址</span>
					</div>
					<i class='iconfont icon-arrow-right'></i>
				`).appendTo('.address')
				$('.bottom-ads').css('display','none');
			}else{
				adsId=data.id;
				$(`
					<div>
						<span>${data.receiveName}</span>
						<span>${data.receivePhone}</span>
					</div>
					<p>
						<span>${data.receiveRegion}</span>
						<span>${data.receiveDetail}</span>
					</p>
					<i class='iconfont icon-arrow-right'></i>
				`).appendTo('.address')
				$(`
					<p class='contain2'>
						<span>送至：</span>
						<span>${data.receiveRegion}</span>
						<span>${data.receiveDetail}</span>
					</p>
				`).appendTo('.bottom-ads')
			}
			
		}
	})
}else if(document.referrer=="http://localhost:3000/address/index.html"){
	$.myAjax({
		// url:'/address/get_default',
		url:`/address/model/${confirmId}`,
		success:function(data){
			if(data===null){
				$(`
					<div class='isnull'>
						<span>请添加送货地址</span>
					</div>
					<i class='iconfont icon-arrow-right'></i>
				`).appendTo('.address')
				$('.bottom-ads').css('display','none');
			}else{
				adsId=data.id;
				$(`
					<div>
						<span>${data.receiveName}</span>
						<span>${data.receivePhone}</span>
					</div>
					<p>
						<span>${data.receiveRegion}</span>
						<span>${data.receiveDetail}</span>
					</p>
					<i class='iconfont icon-arrow-right'></i>
				`).appendTo('.address')
				$(`
					<p class='contain2'>
						<span>送至：</span>
						<span>${data.receiveRegion}</span>
						<span>${data.receiveDetail}</span>
					</p>
				`).appendTo('.bottom-ads')
			}
			
		}
	})
}


$('.address').click(function(){
	location.assign('/address/index.html');
	$('.bottom-ads').empty()
	
})

/* 添加默认地址 */
// var adsId;
// var confirmId = sessionStorage.getItem('confirmId');
// $.myAjax({
// 	// url:'/address/get_default',
// 	url:`/address/model/${confirmId}`,
// 	success:function(data){
// 		if(data===null){
// 			$(`
// 				<div class='isnull'>
// 					<span>请添加送货地址</span>
// 				</div>
// 				<i class='iconfont icon-arrow-right'></i>
// 			`).appendTo('.address')
// 			$('.bottom-ads').css('display','none');
// 		}else{
// 			adsId=data.id;
// 			$(`
// 				<div>
// 					<span>${data.receiveName}</span>
// 					<span>${data.receivePhone}</span>
// 				</div>
// 				<p>
// 					<span>${data.receiveRegion}</span>
// 					<span>${data.receiveDetail}</span>
// 				</p>
// 				<i class='iconfont icon-arrow-right'></i>
// 			`).appendTo('.address')
// 			$(`
// 				<p class='contain2'>
// 					<span>送至：</span>
// 					<span>${data.receiveRegion}</span>
// 					<span>${data.receiveDetail}</span>
// 				</p>
// 			`).appendTo('.bottom-ads')
// 		}
		
// 	}
// })

/* 获取相应的商品 */
var shoppingArr=sessionStorage.getItem('shoppingArr').split(',');
var priceAll=0;
// console.log(shoppingArr)
$.myAjax({
	url:'/cart/list_ids',
	type:'post',
	data:{
		ids:shoppingArr
	},
	success:function(data){
		data.forEach(function(item){
			$(`
				<li class='goods'>
					<div class='pro-img'>
						<div>
							<img src="${item.avatar}" alt="">
						</div>
					</div>
					<div class='goods-detail'>
						<div class='goods-name'>
							<span>${item.name}</span>
						</div>
						<div class='goodsprice clearfix'>
							<span>￥${item.price}</span>
							<span>x${item.count}</span>
						</div>
					</div>
				</li>
			`).appendTo('.products')
			priceAll+=item.count*item.price;
		})
		$(`
			<li class="clearfix">
				<span>商品金额</span>
				<span>￥${priceAll}.00</span>
			</li>
		`).prependTo('.commodity-amount')
		$(`
			<div>
				<span>合计：</span>
				<span>￥<b>${priceAll}</b>.00</span>
				<span>免运费</span>
			</div>
			<div class='sure'>
				<button type="button">提交订单</button>
			</div>
		`).appendTo('.page-settlement')
		
		
		//生成订单
		$('.sure button').click(function(){
			$.myAjax({
				url:'/order/confirm',
				type:'post',
				data:{
					ids:shoppingArr,
					account:priceAll,
					addressId:adsId
				},
				success:data => {
					console.log(data)
					sessionStorage.setItem('orderNum',data);
					location.assign('/payment/index.html');
				}
			})
		})
		
	}
})

















