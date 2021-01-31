$('.page-header').on('click',function(){
	// $(this).find('a').attr('href','/login/index.html');
	window.location.replace("/login/index.html");
})

// console.log(sessionStorage.getItem('name'))
if(sessionStorage.getItem('token')){
	$('.header-login_txt i').text(sessionStorage.getItem('name'))
	$('.exit').css('display','inline-block');
}else{
	$('.header-login_txt i').text('请登录');
	$('.exit').css('display','none');
}

$('.content-nav li').on('click',function(){
	$(this).find('a').attr('href',`/${this.dataset.page}/index.html`)
})

$('.exit').click(function(){
	sessionStorage.removeItem('token');
	sessionStorage.removeItem('name')
	$('.header-login_txt i').text('请登录')
	$('.exit').css('display','none');
})

$('.myOrder a').click(function(){
	$(this).attr('href','/myOrder/index.html');
})