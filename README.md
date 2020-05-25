# vue-express
アプリの環境構築方法

### 1.パッケージのインストール
```
npm install
```

### 2.フロントエンドの開発用サーバーの立ち上げ
```
npm run serve
```

### 3.データベースの作成
データベースのセットアップのためにmysqlでvue-express用のデータベースを作成して、vue_express.dumpを使ってテーブルの作成と初期データの追加を行います。
mysqlへのログイン
```
mysql -u root -p
```
データベースの作成
```
mysql> create database vue_express;
```
vue_express.dumpがあるディレクトリで以下のコマンドを実行
```
mysqldump -u root -p vue_express < ./vue_express.dump
```

### 4.APIサーバーの立ち上げ
```
node server.js
```
### 5.動作確認
http://localhost:8080/ にアクセスして動作を確認する

### (6.本番用のビルド)
```
npm run build
```
サーバーを立ち上げる
```
node server.js
```
http://localhost:3000/ で動作確認する 

### lintの実行
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
