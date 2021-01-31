


var tel=/^1\d{10}$/;
$('.phone').blur(function(){
	var phoneNum=$('.phone').val()
	$.myAjax({
		url:`/user/check_phone/${phoneNum}`,
		success:data =>{
			if(data!==0){
				$('.phoneRemarks').text('手机号已存在')
			}else if(tel.test(phoneNum)){
				$('.phoneRemarks').css("color","#070").text('手机号可以注册');
			}else{
				$('.phoneRemarks').text('手机号填写错误，请填写正确的11位手机号码，例如：13XXXXXXXXX');
			}
		}
	})
})




$('.user').blur(function(){
	var userName=$('.user').val()
	$.myAjax({
		url:`/user/check_name/${userName}`,
		success:data =>{
			if(data!==0){
				$('.userRemarks').text('用户名已存在')
			}else{
				$('.userRemarks').css("color","#070").text('用户名可以注册')
			}
		}
	})
})


$('.register').click(function(){
	$.myAjax({
		url:'/user/register',
		type:'post',
		data:{
			name:$('.user').val(),
			pwd:$('.password').val(),
			phone:$('.phone').val()
		},
		success:data => {
			//询问框
			layer.open({
				content: '您已注册成功，请登录'
				,btn: ['登录', '不要']
				,yes: function(index){
					location.replace('/login/index.html');
					layer.close(index);
				}
				,no:function(index){
					location.replace('/home/index.html');
					layer.close(index);
				}
			});
		}
	})
})




