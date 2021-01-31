

//购物车数量
// $.myAjax({
// 	url:'/cart/total',
// 	success:function(data){
// 		if(data>0){
// 			$('.cart-num').text(data).css('display','block');
// 		}else{
// 			$('.cart-num').css('display','none');
// 		}
// 	}
// })

function aja(){
	$.ajax({
		url:'/cart/total',
		type:'get',
		headers:{
			"Authorization": sessionStorage.getItem('token')
		},
		success:function(result){
			if(result.code===200){
				if(result.data > 0){
					$('.cart-num').text(result.data).css('display','block');
				}else{
					$('.cart-num').css('display','none');
				}
			}
		}
	})
}

aja()








var id=location.search.split('=')[1]
$.myAjax({
	url:`/product/model/${id}`,
	success:function(data){
		
		//返回
		$('.icon-back').click(function(){
			location.assign(`/list/index.html?cid=${data.cid}`);
		})
		//轮播
		var bannerImages=data.bannerImgs.split(',');
		bannerImages.forEach(function(item){
			$(`
				<div class="swiper-slide">
					<img src='${item}' />
				</div>
			`).appendTo('.swiper-wrapper')
			
		})
		 var mySwiper = new Swiper ('.swiper-container', {
		    loop: true ,// 循环模式选项
			autoplay:true,
			pagination: {
				el: '.swiper-pagination',
				type:'fraction'
			}
		})
		
		//商品详情title
		$(`
			<div class='clearfix'>
				<span>￥${data.price}</span>
				<div>
					<i class="iconfont icon-star"></i>
					<span>收藏</span>
				</div>
			</div>
			<div>
				<img src="detail-ph1.png" alt="">
				<span>${data.name}</span>
			</div>
			<div>
				<span>${data.brief}</span>
			</div>
		`).appendTo('.detail-title')
		
		/* 详情图片 */
		var contentImages=data.otherImgs.split(',');
		contentImages.forEach(function(item){
			$(`
				<img src='${item}' />
			`).appendTo('.detail-content_img')
			
		})
		
		/* 加入购物车 */
		$(`
			
			<div class='clearfix'>
				<div>
					<img src="${data.avatar}" alt="">
				</div>
				<div>
					<div class='pro-price'>￥<i>${data.price}</i></div>
					<div>已选：<span class='pro-num'>1</span>件</div>
				</div>
			</div>
			<div class='clearfix'>
				<div><span>数量</span></div>
				<div>
					<i class='minus'>&#45;</i>
					<span class='pro-num txt'>1</span>
					<i class='plus'>&#43;</i>
				</div>
			</div>
			<div>
				<button type="button" class='sure'>确定</button>
			</div>
		`).appendTo('.addProduct-box')
		
		/* 购物车数量减 */
		var i=1
		$('.minus').click(function(){
			if($('.pro-num').text()<=0){
				$('.pro-num').text(0);
			}else{
				i--;
				$('.pro-num').text(i);
			}
		})
		/* 购物车数量加 */
		$('.plus').click(function(){
			i++;
			$('.pro-num').text(i);
		})
		//确认添加
		$('.sure').click(function(){
			if(sessionStorage.getItem('token')){
				layer.open({
					content: '已成功添加购物车'
					,skin: 'msg'
					,time: 2 //2秒后自动关闭
				});
				$('.addProduct').css('display','none');
				
				//向购物车中添加商品
				$.myAjax({
					url:'/cart/add',
					type:'post',
					data:{
						pid:data.id,
						count:$('.pro-num.txt').text()
					},
					success:function(data){
						console.log($('.pro-num.txt').text());
						
						//购物车数量
						// $.myAjax({
						// 	url:'/cart/total',
						// 	success:function(data){
						// 		if(data>0){
						// 			$('.cart-num').text(data).css('display','block');
						// 		}else{
						// 			$('.cart-num').css('display','none');
						// 		}
						// 	}
						// })
						aja()
					}
				})
				
			}else{
				//登录弹窗
				$('.detail-login').css('display','block');
				$('.closeDetailLogin').click(function(){
					$('.detail-login').css('display','none');
				})
				$('.login').click(function(){
					location.replace('/profile/index.html');
				})
			}
			
		})
		
		
		
	}
})

/* 选择 */
$('.detail-content ul li').on('click',function(){
	if($(this).hasClass('active'))return;
	$(this).addClass('active').siblings('.active').removeClass('active');
})

/* 导航 */
$(window).scroll(function(){
	if($(window).scrollTop()>$('.icon-back.detail').height()){
		$('.detail-nav').css('display','flex')
	}else{
		$('.detail-nav').css('display','none')
	}
})

/* 购物车 */
$('.addcart').on('click',function(){
	$('.addProduct').css('display','block');
})
/* 关闭 */
$('.close i').on('click',function(){
	$('.addProduct').css('display','none');
})


//购物车跳转
$('.cart i.icon-carrt').click(function(){
	if(sessionStorage.getItem('token')){
		location.assign('/cart/index.html');
	}else{
		//登录弹窗
		$('.detail-login').css('display','block');
		$('.closeDetailLogin').click(function(){
			$('.detail-login').css('display','none');
		})
		$('.login').click(function(){
			location.replace('/profile/index.html');
		})
	}
})
