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
    }
})
