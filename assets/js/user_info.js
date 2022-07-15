$(function() {
    var form = layui.form
    var layer = layui.layer


    // 用户昵称校验规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间！'

            }

        }
    })

    initUserInfo()

    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                // 调用form.val() 快速 为表单赋值
                form.val('formUserInfo', res.data)


            }
        })
    }

    // 重置表单
    $('#btnReset').on('click', function(e) {
            //  阻止表单默认提交行为
            e.preventDefault();
            initUserInfo()
        })
        // 监听表单的提交行为
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起post
        $.ajax({
            method: 'PUT',
            url: '/my/userinfo',
            //快速获取值
            data: $(this).serialize(),
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')

                // 调用父页面中的方法，重新渲染用户头像和用户信息
                window.parent.getUserInfo()

            }
        })
    })
})