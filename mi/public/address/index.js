
//判断从哪个页面来的
$('.page-header .page-back img').click(function(){
	if(document.referrer == 'http://localhost:3000/confirm/index.html'){
		location.assign(document.referrer)
	}else{
		location.assign('/profile/index.html')
	}
})



$('.page-header .sel-back img').click(function(){
	$('.page-change,.write-address').toggleClass('show');
	$('.sel-back,.page-back').toggleClass('dis');
})


$('.footer-btn').on('click',function(){
	$('.save').css('display','block')
	$('.revise').css('display','none')
	$('.page-change,.write-address').toggleClass('show');
	$('.sel-back,.page-back').toggleClass('dis');
	$('.del').css('display','none')
	$('.page-header').css('background','#f4f4f4');
	$('.page-header span').html('新增地址');
	$('.write-address input').val('');
	$('.btn-default').css('display','none');
})

//获取原有的地址
$.ajax({
	url:"/address/list",
	type:"get",
	headers:{
		"Authorization":sessionStorage.getItem("token")
	},
	success:function(result){
		if(result.code===200){
			// console.log(result)
			result.data.forEach(function(item){
				$('.empty').css('display','none');
				$('.address-data').css('display','block');
				// console.log(item.id)
				// $('.address-data').empty()
				$(`
					<li data-addid='${item.id}' data-default="${item.isDefault}">
						<div class='clearfix'>
							<span class='addnames'>${item.receiveName}</span>
							<i class='addphones'>${item.receivePhone}</i>
						</div>
						<div class='clearfix'>
							<i class='default'></i>
							<span class='addregions'>${item.receiveRegion}</span>
							<span class='detail'>${item.receiveDetail}</span>
							<b><img src='icon_edit_gray.png'></b>
						</div>
					</li>
				`).appendTo('.address-data')
			})
			for(var i=0;i<$('.address-data li').length;i++){
				if($('.address-data li')[i].dataset.default==1){
					$($('.address-data li')[i]).find('.default').text('默认').css({
						'display':'block',
						'color':'red'
					})
				}
			}
		}else{
			alert(result.msg);
		}
	}
})





//保存添加地址
$('.save').on('click',function(){
	$.ajax({
		url:"/address/add",
		type:"post",
		headers:{
			"Authorization":sessionStorage.getItem('token'),
			"Content-Type":"application/json"
		},
		data:JSON.stringify({
			receiveName:$('input.addName').val(),
			receivePhone:$('input.phone').val(),
			receiveRegion:$('input.regions-picker').val(),
			receiveDetail:$('input.detail').val()
		}),
		success:function(result){
			if(result.code===200){
				console.log(result)
				sessionStorage.setItem('addName',$('input.addName').val())
				sessionStorage.setItem('phone',$('input.phone').val())
				sessionStorage.setItem('region',$('input.regions-picker').val())
				sessionStorage.setItem('detail',$('input.detail').val())
				sessionStorage.setItem('addId',result.data);
				
				//新增地址
				$('.page-change,.write-address').toggleClass('show');
				$('.sel-back,.page-back').toggleClass('dis');
				$('.empty').css('display','none');
				$('.address-data').css('display','block');
				// $('.save').css('display','block')
				// $('.revise').css('display','none')
				$(`
					<li data-addid='${sessionStorage.getItem('addId')}'>
						<div class='clearfix'>
							<span class='addnames'>${sessionStorage.getItem('addName')}</span>
							<i class='addphones'>${sessionStorage.getItem('phone')}</i>
						</div>
						<div class='clearfix'>
							<i class='default'></i>
							<span class='addregions'>${sessionStorage.getItem('region')}</span>
							<span class='detail'>${sessionStorage.getItem('detail')}</span>
							<b><img src='icon_edit_gray.png'></b>
						</div>
					</li>
				`).appendTo('.address-data')
				$('.page-header').css('background','#fff');
				$('.page-header span').html('收货地址');
				location.reload()
			}else{
				alert(result.msg);
			}
		}
	})
})


//修改地址
$('.address-data').on('click',function(e){
	$('.sel-back,.page-back').toggleClass('dis');
	$('.page-change,.write-address').toggleClass('show');
	$('.page-header').css('background','#f4f4f4');
	$('.page-header span').html('编辑地址');
	$('.del').css('display','block');
	$('.btn-default').css('display','block');
	
	$('.save').css('display','none')
	$('.revise').css('display','block')
	
	var li;
	if(e.target.tagName==='LI'){
		li=e.target;
	}else if(e.target.tagName!=='LI'&&e.target.tagName==='DIV'){
		li=e.target.parentNode;
	}else{
		li=e.target.parentNode.parentNode;
	}
	if($(li).hasClass('active'))return;
	$(li).addClass('active').siblings('.active').removeClass('active');


	//判断从哪里来的，是否是从订单页 
	if(document.referrer === 'http://localhost:3000/confirm/index.html'){
		
		var addressid = $('.address-data .active')[0].dataset.addid;
		sessionStorage.setItem('confirmId',addressid)
		location.replace('/confirm/index.html')
		
	}else{

	
		$('input.addName').val($('.active').find('.addnames').text())
		$('input.phone').val($('.active').find('.addphones').text())
		$('input.regions-picker').val($('.active').find('.addregions').text())
		$('input.detail').val($('.active').find('.detail').text())
		
		$('.revise').on('click',function(){
			$('.page-change,.write-address').toggleClass('show');
			$('.sel-back,.page-back').toggleClass('dis');
			$.ajax({
					url:"/address/update",
					type:"post",
					headers:{
						"Authorization":sessionStorage.getItem('token'),
						"Content-Type":"application/json"
					},
					data:JSON.stringify({
						id:$('.address-data .active')[0].dataset.addid,
						receiveName:$('input.addName').val(),
						receivePhone:$('input.phone').val(),
						receiveRegion:$('input.regions-picker').val(),
						receiveDetail:$('input.detail').val()
					}),
					success:function(result){
						if(result.code===200){
							sessionStorage.setItem('addName',$('input.addName').val())
							sessionStorage.setItem('phone',$('input.phone').val())
							sessionStorage.setItem('region',$('input.regions-picker').val())
							sessionStorage.setItem('detail',$('input.detail').val())
							sessionStorage.setItem('addId',$('.address-data .active')[0].dataset.addid);
							$('.address-data .active').find('.addnames').text($('input.addName').val())
							$('.address-data .active').find('.addphones').text($('input.phone').val())
							$('.address-data .active').find('.addregions').text($('input.regions-picker').val())
							$('.address-data .active').find('.detail').text($('input.detail').val())
							
							$('.page-header').css('background','#fff');
							$('.page-header span').html('收货地址');
							// location.reload();
						}else{
							alert(result.msg);
						}
					}
					
					
				})
		})
	
	}
	
})

//删除地址
$('div.del').on('click',function(){
	// console.log($('.address-data .active')[0].dataset.addid)
	
	$.ajax({
		url:`/address/remove/${parseInt($('.address-data .active')[0].dataset.addid)}`,
		type:"get",
		headers:{
			"Authorization":sessionStorage.getItem('token')
		},
		success:function(result){
			// console.log(result)
			if(result.code==200){
				$('.page-change,.write-address').toggleClass('show');
				$('.sel-back,.page-back').toggleClass('dis');
				$('.address-data .active').remove()
				$('.page-header').css('background','#fff');
				$('.page-header span').html('收货地址');
				location.reload()
			}else{
				alert(result.msg);
			}
		}
	})
})

//设置默认地址
$('.btn-default').on("click",function(){
	
	$('.address-data .default').css({
		'display':'none'
	})
	$(this).find('i').css({
		'background':'#f00',
		'border': '1px solid #f00'
	})
	
	var adsid=parseInt($('.address-data .active')[0].dataset.addid);
	console.log(adsid)
	
	$.ajax({
		url:`/address/set_default/${adsid}`,
		type:"get",
		headers:{
			"Authorization":sessionStorage.getItem('token')
		},
		success:function(result){
			if(result.code===200){
				// $('.page-change,.write-address').toggleClass('show');
				
				
				$('.address-data .active').find('.default').text('默认').css({
					'display':'block',
					"color":'red'
				});
				
				
			}else{
				alert(result.msg);
			}
		}
	})
})
