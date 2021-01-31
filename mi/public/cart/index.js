
// $('.icon-back').click(function(){
	
// 	history.back()
// 	// self.location=document.referrer;
// })

$('.icon-back').click(function(){
	console.log(document.referrer.split('?')[0])
	if(document.referrer.split('?')[0] == 'http://localhost:3000/detail/index.html'){
		location.assign(document.referrer)
	}else{
		location.assign('/home/index.html')
	}
})



$.myAjax({
	url:'/cart/list',
	type:'post',
	success:function(data){
		data.forEach(function(item){
			$(`
				<li data-id='${item.id}'>
					<div><i class="check" data-choose='false'>&radic;</i></div>
					<div class='pro-img'>
						<img src="${item.avatar}" >
					</div>
					<div>
						<span>${item.name}</span>
						<div class='nums'>
							<p>￥${item.price}</p>
							<div class='proNum'>
								<i class='minus'>&#45;</i>
								<input type='text' class='cart-num' value="${item.count}" disabled="true"></input>
								<i class='plus'>&#43;</i>
							</div>
						</div>
					</div>
				</li>
			`).appendTo('.product')
		})
		
		
		
		var goods=[]//存储已选择的商品的信息
		var delId=[];//存储删除ID
		var arrIndex=[];//存储删除ID的下标
		/* 数量加 */
		$('i.plus').on('click',function(){
			var goodIndex=$(this).parents('li').index()
			var id=$(this).parents('li')[0].dataset.id;
			var i=$(this).parents('li').find($('.cart-num')).val();
			
			$.myAjax({
				url:`/cart/increase/${id}`,
				type:'post',
				success:data1=>{
					$(this).parents('li').find($('.cart-num')).val(++i);
					data[goodIndex].count=i;
					allGoodsPrice()
				}
			})
			// allGoodsPrice()
		})
		/* 数量减 */
		$('i.minus').on('click',function(){
			var goodIndex=$(this).parents('li').index()
			var id=$(this).parents('li')[0].dataset.id;
			var i=$(this).parents('li').find($('.cart-num')).val();
			if(i<=1)return
				$.myAjax({
					url:`/cart/decrease/${id}`,
					type:'post',
					success:data1 =>{
						$(this).parents('li').find($('.cart-num')).val(--i);
						data[goodIndex].count=i;
						allGoodsPrice()
					}
				})
			
			// allGoodsPrice()
		})
		
		
		
		/* 编辑 */
		$('.write').on('click',function(){
			if($(this).hasClass('finish')){
				$(this).removeClass('finish');
				$('.write').text('编辑');
				$('.total p').css('display','block');
				$('.total div button.del').css('display','none');
				$('.total div button.tol').css('display','inline-block');
			}else{
				$(this).addClass('finish');
				$('.write').text('完成');
				$('.total p').css('display','none');
				$('.total div button.tol').css('display','none');
				$('.total div button.del').css('display','inline-block');
			}
			
		})
		
		/* 点击选择 */
	
		var productCount=0
		$('i.check').on('click',function(){
			if(this.dataset.choose=='false'){
				$(this).css({
					'background':'#f00',
					'border':'0'
				})
				this.dataset.choose='true';
				productCount++;
				//存储选择的ID，和所对应的下标
				if(delId.length>data.length)return
				delId.push(parseInt($(this).parents('li')[0].dataset.id));
				arrIndex.push($(this).parents('li').index());
				
				var goodIndex=$(this).parents('li').index()
				goods.push(data[goodIndex])
				allGoodsPrice()
			}else if(this.dataset.choose=='true'){
				$(this).css({
					'background':'#fff',
					'border':'2px solid #ccc'
				})
				productCount--;
				//删除已取消选择的ID和所对应的下标
				var reIndex=delId.indexOf(parseInt($(this).parents('li')[0].dataset.id),0);
				if(reIndex!=-1)delId.splice(reIndex,1);
				var inIndex=arrIndex.indexOf($(this).parents('li').index(),0)
				if(inIndex!=-1)arrIndex.splice(inIndex,1)
				
				var goodIndex=$(this).parents('li').index()
				var j=goods.indexOf(data[goodIndex]);
				goods.splice(j,1)
				
				this.dataset.choose='false';
				allGoodsPrice()
			}
			
			// 全选
			if(this.dataset.chooseall=='false'){
				$('i.check').css({
					'background':'#f00',
					'border':'0'
				})
				productCount=$('.product li').length;
				for(var i=0;i<$('i.check').length;i++){
					$('i.check')[i].dataset.choose='true';
				}
				for(var i=0;i<$('.check.all').length;i++){
					$('.check.all')[i].dataset.chooseall='true';
					delete $('.check.all')[i].dataset.choose;
				}
				//将所有的商品的ID放入delId中将对应下标放入arrIndex中
				for(var i=0;i<data.length;i++){
					delId.push(data[i].id);
				}
				for(var i=0;i<$('.product li').length;i++){
					arrIndex.push(i)
				}
				
				goods=data.concat();
				allGoodsPrice()
			}else if(this.dataset.chooseall=='true'){
				$('i.check').css({
					'background':'#fff',
					'border':'2px solid #ccc'
				})
				productCount=0;
				for(var i=0;i<$('i.check').length;i++){
					$('i.check')[i].dataset.choose='false';
				}
				for(var i=0;i<$('.check.all').length;i++){
					$('.check.all')[i].dataset.chooseall='false';
					delete $('.check.all')[i].dataset.choose;
				}
				//将所有商品ID和对应下标清空
				delId=[];
				arrIndex=[];
				
				goods=[]
				allGoodsPrice()
			}
			
			//判断是否全选
			if(productCount==$('.product li').length){
				$('i.check.all').css({
					'background':'#f00',
					'border':'0'
				})
				for(var i=0;i<$('.check.all').length;i++){
					$('.check.all')[i].dataset.chooseall='true';
					// delete $('.check.all')[i].dataset.choose;
				}
			}else if(productCount<$('.product li').length){
				$('i.check.all').css({
					'background':'#fff',
					'border':'2px solid #ccc'
				})
				for(var i=0;i<$('.check.all').length;i++){
					$('.check.all')[i].dataset.chooseall='false';
					// delete $('.check.all')[i].dataset.choose;
				}
			}
			
			sessionStorage.setItem('shoppingArr',delId)
			
		})
		//删除
			$('.total div button.del').on('click',function(){
				if($('.total div button').hasClass('del')){
					
					// delId=[];
					$.myAjax({
						url:'/cart/remove',
						type:'post',
						data:{
							ids:delId
						},
						success:function(){
							arrIndex.forEach(function(item){
								console.log(item)
								var j=goods.indexOf(data[item]);
								// console.log(j)
								// console.log(goods)
								goods.splice(j,1)
								console.log(goods)
								$('.product li').eq(item).css('display','none')
							})
							
							
							
							
							allGoodsPrice()
							
							location.reload()
						}
					})
				}
			})
		
		//购物车数量
		$.myAjax({
			url:'/cart/total',
			success:function(data){}
		})
		
		console.log(delId)
		
		/* 总价 */
		function allGoodsPrice(){
			var all=0;
			var numbers=0
			for(var k=0;k<goods.length;k++){
				all+=goods[k].count*goods[k].price;
				numbers+=goods[k].count
			}
			$('.totalprice').text(all);
			if(numbers>0){
				$('.totalnumbers').css('display','inline-block')
				$('.totalnumbers i').text(numbers);
			}else{
				$('.totalnumbers').css('display','none')
			}
		}
		
		
		$('.tol').click(function(){
			location.assign('/confirm/index.html')
		})
		
		
	}
})


