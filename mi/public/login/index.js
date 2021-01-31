//用户名密码登录与手机验证码登录模式的切换
$('.btn-toggle').on('click',function(){
	$('.login-pwd,.login-phone').toggleClass('show');
});

//手机号验证码登录
$('button.btn-login-phone').on('click',function(){
	alert('手机号验证码登录功能暂未开放，请切换为用户名密码登录');
})

//用户名密码登录
$('button.btn-login-pwd').on('click',function(){
	//进行非空验证，收集用户名和密码，发Ajax到后台进行验证，返还结果
	$.ajax({
		url:"/user/login_pwd",
		type:"post",
		//headers节点用于设置请求头
		headers:{
			"Content-Type":"application/json"
		},
		data:JSON.stringify({
			//trim()去除前后无效空格
			name:$('input.name').val().trim(),
			pwd:$('input.pwd').val()
		}),
		success:function(result){
			if(result.code===200){
				sessionStorage.setItem('token',result.data);
				sessionStorage.setItem('name',$('input.name').val().trim());
				window.location.replace("/profile/index.html");
			}else{
				alert(result.msg);
			}
			
			
			
		}
	})
})

$('.now').click(function(){
	location.assign('/register/index.html');
})