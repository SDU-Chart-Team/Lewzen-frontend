const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath:'./',
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
    },
    configureWebpack: {
        resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    }
                }
            ]
        },
        performance:{
            hints:false,
        },
        optimization:{
            minimize:true,
            splitChunks:{
                chunks:'all',
            }
        }
    },
})

