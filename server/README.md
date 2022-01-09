docker-compose から実行してください

npm run build
npm start

//以下メモ-------------------------------------------------------

// 任意のディレクトリでプロジェクトを初期化
npm init -y

// TypeScript + webpack 関連モジュールを devDependencies にインストール
npm install --save-dev typescript ts-loader webpack webpack-cli
npm install --save-dev webpack-dev-server source-map-loader

//typescript のインストール、バージョン、コンパイル
npm install --save-dev typescript
npx tsc --version
npx tsc <filename>

//tsconfig.json の設定
npx tsc --init

npm install --save-dev webpack-merge

touch webpack.server.js

npm install --save express @types/express
npm install --save node-fetch@2.6.5
npm install --save @types/node-fetch@2.5.12

npm install --save jsonwebtoken
npm install --save @types/jsonwebtoken

npm install --save body-parser
