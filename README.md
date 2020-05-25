# vue-express
アプリの環境構築方法
### 1.パッケージのインストール
```
npm install
```
### 2.データベースの作成
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
### 3.環境変数の設定
プロジェクトのrootディレクトリに.envファイルを作成する
```
touch .env
```
以下の内容を指定()内はサンプルコマンドでの設定値
```
MYSQL_USER=データベースを作成したMySQLのユーザー(root)
MYSQL_PASSWORD=上記ユーザーのパスワード
MYSQL_DATABASE=作成したデータベース名(vue_express)
SESSION_PWD=session管理のためのキー(任意の文字列)
```
### 4.フロントエンドの開発用サーバーの立ち上げ
```
npm run serve
```
### 5.APIサーバーの立ち上げ
```
node server.js
```
### 6.動作確認
http://localhost:8080/ にアクセスして動作を確認する

### (7.本番用のビルド)
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
