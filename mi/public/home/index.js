/* 轮播 */
var mySwiper = new Swiper ('.swiper-container', {
	loop: true ,// 循环模式选项
	autoplay:true,
	pagination: {
		el: '.swiper-pagination',
		type:'bullets',
		bulletElement : 'li'
	}
})


var iconArr=[
	{img:'img/home-ph10.png',txt:'上新精选'},
	{img:'img/home-ph11.png',txt:'小米众筹'},
	{img:'img/home-ph12.png',txt:'有品秒杀'},
	{img:'img/home-ph13.png',txt:'热销排行'},
	{img:'img/home-ph14.png',txt:'小米自营'},
	{img:'img/home-ph15.png',txt:'下单立返'},
	{img:'img/home-ph16.png',txt:'9.9包邮'},
	{img:'img/home-ph17.png',txt:'有品直播'},
	{img:'img/home-ph18.png',txt:'小米庄园'},
	{img:'img/home-ph19.png',txt:'智能生活'}
]

iconArr.forEach(function(item){
	$(`
		<div>
			<img src="${item.img}" alt="">
			<span>${item.txt}</span>
		</div>
	`).appendTo('.icon-img')
})


var goodsArr=[
	{img:'img/home-ph22.png'},
	{img:'img/home-ph23.png'},
	{img:'img/home-ph24.png'},
	{img:'img/home-ph25.png'},
	{img:'img/home-ph26.png'},
	{img:'img/home-ph27.png'},
	{img:'img/home-ph28.png'},
	{img:'img/home-ph29.png'}
]

goodsArr.forEach(function(item){
	$(`
		<div>
			<img src="${item.img}" alt="">
		</div>
	`).appendTo('.goodsimg')
})

var productArr=[
	{img:'img/home-ph31.png',txt:'Redmi Note9'},
	{img:'img/home-ph32.png',txt:'扫地机器人'},
	{img:'img/home-ph33.png',txt:'小米显示屏'},
	{img:'img/home-ph34.png',txt:'小米净水器'},
	{img:'img/home-ph35.png',txt:'洗衣凝珠'},
	{img:'img/home-ph36.png',txt:'棉服'},
	{img:'img/home-ph37.png',txt:'花茶'},
	{img:'img/home-ph38.png',txt:'润肤露'},
	{img:'img/home-ph39.png',txt:'羽绒马甲'},
	{img:'img/home-ph40.png',txt:'牙膏'},
	{img:'img/home-ph41.jpg',txt:'棉服'},
	{img:'img/home-ph42.jpg',txt:'无线充电器'},
	{img:'img/home-ph43.png',txt:'小米手表'},
	{img:'img/home-ph44.png',txt:'弓箭'},
	{img:'img/home-ph45.jpg',txt:'羽绒服'},
	{img:'img/home-ph46.jpg',txt:'灯'},
	{img:'img/home-ph47.png',txt:'小米冰箱'}
]

productArr.forEach(function(item){
	$(`
		<li>
			<img src="${item.img}" alt="">
			<span>${item.txt}</span>
		</li>
	`).appendTo('.goods')
})