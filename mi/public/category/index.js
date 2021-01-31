

$('ul.list-main').on('click',function(e){
	// console.log(e.target)
	var li=e.target.tagName==='LI'?e.target:e.target.parentNode;
	if($(li).hasClass('active'))return;
	$(li).addClass('active').siblings('.active').removeClass('active');
	$('img.avatar').attr('src',li.dataset.avatar);
	
	$.myAjax({
		url:`/category/list/${li.dataset.id}`,
		success:function(data){
			console.log(data)
			$('ul.list-sub').empty().toggleClass('show',data.length>0);
			$('p.empty').toggleClass('show',data.length===0);
			data.forEach(function(item){
				$(`
					<li>
						<a href="/list/index.html?cid=${item.id}">
							<img src="${item.avatar}"/>
							<span>${item.name}</span>
						</a>
					</li>
				`).appendTo('ul.list-sub');
			})
		}
	})
	


	
	// $.ajax({
	// 	url:`/category/list/${li.dataset.id}`,
	// 	type:"get",
	// 	success:function(result){
	// 		// console.log(result)
	// 		if(result.code===200){
	// 			$('ul.list-sub').empty().toggleClass('show',result.data.length>0);
	// 			$('p.empty').toggleClass('show',result.data.length===0);
	// 			result.data.forEach(function(item){
	// 				$(`
	// 					<li>
	// 						<a href="/list/index.html?cid=${item.id}">
	// 							<img src="${item.avatar}"/>
	// 							<span>${item.name}</span>
	// 						</a>
	// 					</li>
	// 				`).appendTo('ul.list-sub');
	// 			})
	// 		}
			
	// 	}
	// });
});


$.myAjax({
	url:"/category/list/0",/* 路径 */
	success:function(data){
		data.forEach(function(item){
			$(`
				<li data-id="${item.id}" data-avatar="${item.avatar}">
					<span>${item.name}</span>
				</li>
			`).appendTo('.list-main')
		});
		//trigger模拟触发第一个li点击事件
		$('ul.list-main li').eq(0).trigger('click');
	}
})




//发送ajax请求一级分类的数据
// $.ajax({
// 	// 键:值【键不能改】
// 	url:"/category/list/0",/* 路径 */
// 	type:"get",
// 	success:function(result){
// 		/* 把回来的数据拼成多个li放在ul.list-main中 */
// 		// console.log(result)
// 		if(result.code===200){
// 			result.data.forEach(function(item){
// 				$(`
// 					<li data-id="${item.id}" data-avatar="${item.avatar}">
// 						<span>${item.name}</span>
// 					</li>
// 				`).appendTo('.list-main')
// 			});
// 			//trigger模拟触发第一个li点击事件
// 			$('ul.list-main li').eq(0).trigger('click');
// 		}
// 	}
// });
