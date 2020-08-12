/**
 * webpack插件 上传已经有的图片到cnd服务器
 */
const request = require('request');
const fs = require("fs");
const getImageFiles = (path) => {
    var imageList = [];
    fs.readdir(path, function (err, files) {
        files.forEach(item => {
            console.log(`${path}\\${item}`);
            imageList.push(fs.createReadStream(`${path}\\${item}`));
        })
    })
    return imageList;
}
class FileToCdn {
    //获取用户配置
    constructor(options) {
        //服务器上传路径
        this.uploadUrl = options.uploadUrl;
        //获取需要上传的文件夹路径
        this.path = options.path;
    }
    // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
    apply(compiler) {
        compiler.hooks.afterEmit.tapPromise('MyWebpackPlugin', (compilation) => {
            return new Promise((resolve, rejects) => {
                //读取文件夹下所有文件流

                let imgList = getImageFiles(this.path);
                let formData={
                    // Pass a simple key-value pair
                    my_field:"file",
                    // Pass data via Buffers
                    my_buffer: new Buffer([1, 2, 3]),
                    // Pass data via Streams
                    // my_file: fs.createReadStream(`${path}\\${item}`),
                    attachments:imgList
                }
                request.post({
                    url: this.uploadUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    formData: formData
                }, function optionalCallback(err, httpResponse, body) {
                    if (err) {
                        return console.error('upload failed:', err);
                    }
                    console.log('Upload successful!  Server responded with:', body);
                })
                resolve()
            })
        })
    }
}

//导出
module.exports = FileToCdn