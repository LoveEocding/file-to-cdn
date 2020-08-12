const path=require('path');

const config={
    entry:'./src/index.js',
    output:{
        filename:'index.js',
        path:path.resolve(__dirname),
        libraryTarget:'commonjs2',
    },
    // devtool:'source-map', 
    target:'node',
    devServer:{
        contentBase:path.resolve(__dirname),
        port:9000
    },
    mode:'production'
}

module.exports=config