// 注意：每次调用$.get()或$.post()或$.ajax()的时候
// 会先调用ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3008' + options.url
    console.log(options.url);

    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }

    // 全局统一挂载complete 回调函数
    options.complete = function(res) {
        // console.log('执行了complete回调')
        // console.log(res)
        // 在complete回调函数中，可以使用res.responseJSON拿到
        // 服务器响应回来的数据
        if (res.responseJSON.code !== 0 && res.responseJSON.message !== '获取用户基本信息成功！') {
            // 1.强制清空token
            localStorage.removeItem('token')
                // 2.强制跳转到登录页面
            location.href = '/day1/code/login.html'

        }
    }

})