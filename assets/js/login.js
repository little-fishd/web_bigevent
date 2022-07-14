$(function() {
    // 点击“去注册”链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击‘去登录链接’
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()

    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify自定义函数 校验规则
    form.verify({
        // 定义了一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 定义一个确认密码的校验规则
        repwd: function(value) {
            // 先拿到密码
            // 再与确认密码比较看是否一致
            // 如果判断失败，return一个失败消息即可
            var pwd = $('.reg-box [name = password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件

    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
            // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
            repassword: $('#form_reg [name=repassword]').val()
        }

        $.post('/api/reg', data,
            function(res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                    // 模拟人的点击行为
                $('#link_login').click()
            })
    })


    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        var data1 = {
                username: $('#form_login [name=username]').val(),
                password: $('#form_login [name=password]').val()

            }
            // console.log(data1.username);
            // console.log(data1.password)
        $.post(
            '/api/login',
            data1,
            function(res) {


                if (res.code !== 0) {
                    return layer.msg('登录失败')
                }

                layer.msg('登录成功！')

                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)

                // 跳转到后台主页
                location.href = '/day1/code/index.html'
            }
        )
    })
})