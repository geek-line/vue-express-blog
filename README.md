# vue-express

## パッケージのインストール
```
npm install
```

### フロントエンドの開発用サーバーの立ち上げ
```
npm run serve
```

### データベースの作成
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

### APIサーバーの立ち上げ
```
node server.js
```

### 本番用のビルド
```
npm run build
```

### lintの実行
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
