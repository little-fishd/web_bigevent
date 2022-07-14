$(function() {
    // 调用用户的基本信息
    getUserInfo()

    var layer = layui.layer
        // 退出按钮事件
    $('#btnLogOut').on('click', function() {
        // 提示用户是否退出
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
                // 2.重新跳转到登录页面
            location.href = '/day1/code/login.html'

            // 关闭confirm询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'Get',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            console.log(res);
            if (res.code !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvater渲染用户头像
            rederAvater(res.data)

        },
        // 不论成功还是失败，最终都会调用complete 回调函数
        // complete: function(res) {
        //     // console.log('执行了complete回调')
        //     // console.log(res)
        //     // 在complete回调函数中，可以使用res.responseJSON拿到
        //     // 服务器响应回来的数据
        //     if (res.responseJSON.code !== 0 && res.responseJSON.message !== '获取用户基本信息成功！') {
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //             // 2.强制跳转到登录页面
        //         location.href = '/day1/code/login.html'

        //     }
        // }
    })
}

// 渲染用户头像
function rederAvater(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username
        // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
        // 3.按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
            // 隐藏文本图片
        $('.text-avater').hide()
    } else {
        //   取用户名第一个字母，并大写
        var first = name[0].toUpperCase()
            // 3.2渲染文本头像
        $('.text-avater')
            .html(first)
            .show()
            // 隐藏图片头像
        $('.layui-nav-img').hide()
    }

}