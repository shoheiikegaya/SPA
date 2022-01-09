// 任意のディレクトリでプロジェクトを初期化
npm init -y

// React 関連モジュールとその型定義を dependencies にインストール
npm install --save react react-dom @types/react @types/react-dom

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

touch webpack.common.js
touch webpack.dev.js
touch webpack.prod.js

npm install --save react-router-dom@5.3.0
npm install --save-dev @types/react-router-dom@5.3.0

npm install --save @material-ui/core
npm install --save @material-ui/icons

npm install --save node-fetch@2.6.5
npm install --save @types/node-fetch@2.5.12

//-------------------------------------------------------

npm run dev
npm start
