module.exports = {
  devServer: {
    port: 8080,
        // localhostでvueからexpressにAPIリクエストを送信する為の設定
    proxy: 'http://localhost:3000' 
    },
  configureWebpack: {
    devtool: 'source-map'
    }
}