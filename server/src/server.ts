import { Express, Request, Response, NextFunction } from "express";
//import test from "./api/test";
import covid19 from "./api/Covid19";

const jwt = require("jsonwebtoken");
const express = require("express");
const app: Express = express();
const APP_SECRET = "himitsu";

//ExpressでPOSTを受け取る
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DB_USER = [
  { username: "test1", password: "pass1", email: "test1@test.com" },
  { username: "test2", password: "pass2", email: "test2@test.com" },
  { username: "test3", password: "pass3", email: "test3@test.com" },
];

//APIサービスを構築する際に、Postmanなどのツールでは正常にアクセスできますが、
//ブラウザからアクセスすると、エラーになる場合があります。
//それはCORS(Cross-Origin Resource Sharing)対応をしていない可能性があります。
//なぜなら、サイトのドメインとAPIサービスのドメインが違う場合は
//先にoptionsメソッドで問い合わせをします。許可する場合のみ実際のAPIを通信します。
//const allowCrossDomain = function (req: any, res: any, next: any) {
const allowCrossDomain = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("^0^=" + req.method);
  res.header("Access-Control-Allow-Origin", "*");
  //res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, access_token"
  );

  console.log("allowCrossDomain=" + req.method);
  // intercept OPTIONS method
  if ("OPTIONS" === req.method) {
    console.log("OPTIONS");
    res.send(200);
  } else {
    console.log("next");
    next();
  }
};
app.use(allowCrossDomain);

//トークンを生成する
const option = {
  expiresIn: "1m",
  //expiresIn: '24h',
  algorithm: "HS256",
};
const generateToken = (userHash: string) =>
  jwt.sign({ hash: userHash }, APP_SECRET, {
    algorithm: "HS256",
    //expiresIn: 60 * 60 * 24,
    expiresIn: "1m",
  });

//トークンが正しいか検証する
const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    console.log("verifyTokenにきている");
    jwt.verify(token, APP_SECRET, (err: any, decoded: string) => {
      if (err) {
        reject(err);
      }
      //resolve();
      resolve("OK");
    });
  });

//Preprocessing
const Preprocessing = (req: Request, res: Response, next: NextFunction) => {
  next();
};

//アクセスにJWTトークンを要求する
const requireToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("requireTokenにきている");
  if (!req.headers) {
    res.sendStatus(401);
  }

  console.log("req.headers.authorization=" + req.headers.authorization);
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace(/Bearer\s/, "");
    console.log("token = " + token);
    await verifyToken(token)
      .then((ret: any) => {
        console.log("ret=" + ret);
        next();
      })
      .catch((error: any) => {
        console.error(error);
        console.log("【401_2】");
        //res.sendStatus(401);
        res.json({
          success: false,
          message: "No Authenticate",
          data: "",
        });
      });

    //next();
  } else {
    res.sendStatus(401); //ここでエラーが出ている。testの後に、なぜここを通るのか？
  }
  //res.sendStatus(401); //ここでエラーが出ている。testの後に、なぜここを通るのか？
};

//ユーザー認証 JWT発行
app.post("/auth", async (req: Request, res: Response, next: NextFunction) => {
  console.log("authにきている");
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.password);
  const email = req.body.email;
  const password = req.body.password;

  let isSuccessVal = false;
  let messageVal = "No Authenticate";

  DB_USER.forEach(function (items) {
    console.log(items.username);
    console.log(items.password);
    console.log(items.email);
    if (email == items.email && password == items.password) {
      isSuccessVal = true;
      messageVal = "Ok Authenticate";
      //return;
    }
  });

  let tokenVal = "";
  if (isSuccessVal == false) {
  } else {
    tokenVal = generateToken(email);
    console.log(tokenVal);
  }

  res.json({
    success: isSuccessVal,
    message: messageVal,
    data: JSON.stringify(tokenVal),
  });
});

app.get("/covid19", Preprocessing, requireToken, covid19);

app.get("/test", (req, res) => res.send("Hello World!"));

//app.listen(process.env.PORT || 3000, function () {
app.listen(process.env.PORT || 3000, function () {
  console.log("express app is started.");
});
