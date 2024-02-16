const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/main.scss";`
      }
    }
  },
  devServer: {
    proxy: 'http://eturn.ru/api'
  }
})
