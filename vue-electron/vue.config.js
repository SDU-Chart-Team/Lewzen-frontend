const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer:{
        proxy:{
            '/socket.io':{
                target:'http://localhost:3000',
                changeOrigin:true,
                logLevel:'debug'
            }
        }
    },
    chainWebpack: (config) => {
        config.module
            .rule("wasm")
            .test(/\.wasm$/)
            .use("wasm-loader")
            .loader("wasm-loader")
            .end();
    }
})