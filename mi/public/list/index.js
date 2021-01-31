$('.back').click(function(){
	location.assign('/category/index.html');
})



id=location.search.split('=')[1]
var orderCol='price';
var orderDir='asc';
var begin=0;


list()

/* 切换 */
choose()
function choose(){
	var list_sel1=true;
	$('.page-serch_choose i').on('click',$.debounce(function(){
		$('.icon-category,.icon-category1').toggleClass('sel');
		if(list_sel1){
			$('.spread-list').removeClass('cross')
			$('.spread-list').addClass('erect')
			list_sel1=false;
		}else{
			
			$('.spread-list').removeClass('erect')
			$('.spread-list').addClass('cross')
			list_sel1=true;
		}
	},1000))
}

/* 升序降序切换 */
var list_sel2=true;
$('.page-serch_order i').on('click',$.debounce(function(){
	$('.icon-desc,.icon-asc').toggleClass('sel');
	if(list_sel2){
		$('ul.spread-list').empty()
		begin=0;
		orderDir='desc';
		list()
		list_sel2=false;
		
	}else{
		$('ul.spread-list').empty()
		begin=0;
		orderDir='asc';
		list()
		list_sel2=true;
	}
},1000))

/* 选择排列 */
$('.page-serch_ch').on('click',$.debounce(function(e){
	var p;
	if(e.target.tagName==='P'){
		p=e.target;
	}
	if($(p).hasClass('active'))return;
	$(p).addClass('active').css('color','#d37f00').siblings('.active').removeClass('active').css('color','#666');
	orderCol=p.dataset.choose;
	// console.log(orderCol)
	$('ul.spread-list').empty()
	begin=0;
	list()
},1000))

/* 搜索框 */
$('.serch-write_btn').on('click',function(){
	$('ul.spread-list').empty();
	begin=0;
	list()
})


$('.spread').scroll(function(){
	var height=$('.spread').scrollTop();
	var heightminus=$('.page-container').height()-$(this).height();
	if(height>heightminus){
		if($('ul.spread-list li').length%6==0&&begin<12){
			begin+=6;
			// console.log(begin)
			list();
		}
		
	}
	// console.log(height)
})



function list(){
	$.myAjax({
		url:'/product/list',
		type:"post",
		data:{
			name:$('.serch-write input').val(),
			cid:`${id}`,
			orderCol:orderCol,
			orderDir:orderDir,
			begin:begin,
			pageSize:6
		},
		success:function(data){
			data.forEach(function(item){
				$(`
					<li>
						<a href="/detail/index.html?id=${item.id}" class="clearfix">
							<div class="spread-list_img"><img src="${item.avatar}"></div>
							<div class="spread-list_box">
								<p class="spread-list_title ellipsis">${item.name}</p>
								<p class="spread-list_bief ellipsis">${item.brief}</p>
								<div><span>全面屏</span><span>小艾控制</span></div>
								<div class="spread-list_price">￥${item.price}</div>
								<div>
									<span class="spread-list_sale">销量：${item.sale}</span>
									<span class="spread-list_rate">好评：${item.rate}</span>
								</div>
							</div>
						</a>
					</li>
				`).appendTo('ul.spread-list');
			});
			
		}
	})
}









