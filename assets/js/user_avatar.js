 $(function() {
     var layer = layui.layer

     // 1.1 获取裁剪区域的 DOM 元素
     var $image = $('#image')
         // 1.2 配置选项
     const options = {
         // 纵横比
         aspectRatio: 1,
         // 指定预览区域
         preview: '.img-preview'
     }

     // 1.3 创建裁剪区域
     $image.cropper(options)


     //  为上传按钮添加点击事件
     $('#btnChooseImage').on('click', function() {
         $('#file').click()
     })

     //  为选择文件绑定 change事件
     $('#file').on('change', function(e) {
         //  console.log(e);
         var fileList = e.target.files;
         if (fileList.length === 0) {
             return layer.msg('请选择照片')
         }

         //  1.拿到用户选择的文件
         var file = e.target.files[0]
             // 2. 根据选择的文件，创建一个对应的 URL 
         var newImgURL = URL.createObjectURL(file);
         //  3.先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
         $image
             .cropper('destroy') // 销毁旧的裁剪区域
             .attr('src', newImgURL) // 重新设置图片路径
             .cropper(options) // 重新初始化裁剪区域

     })

     //  为确定按钮绑定点击事件
     $('#btnUpload').on('click', function() {
         // 1.先拿到剪裁 部分的图片
         var dataURL = $image
             .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                 width: 100,
                 height: 100
             })
             .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

         //  console.log(dataURL);

         // 2.将剪裁的图片上传到服务器
         $.ajax({
             method: 'PATCH',
             url: '/my/update/avatar',
             data: {
                 avatar: dataURL
             },
             success: function(res) {
                 if (res.code !== 0) {
                     return layer.msg('更新图片失败')
                 }
                 layer.msg('更新图片成功！')
                     // 调用父页面中的方法，重新渲染用户头像和用户信息
                 window.parent.getUserInfo()
             }
         })
     })
 })