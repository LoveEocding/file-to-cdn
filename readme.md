
# file-to-cdn

## 概述

webpack插件,在webpack打包完成以后自动上传文件到cdn

## Install(安装)

npm install file-to-cdn --save

## Usage(使用)
```
plugins:[
        new FileToCdnPlugin({
            //目录位置
            path:path.resolve(__dirname,'../dist/imgs/'), 
            //上传接口
            uploadUrl:'https://XXXXX'
        })
],
```
## Donation
[github](https://www.google.com.hk/)
...

## Contact me(联系我)

...