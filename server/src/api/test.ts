import * as express from "express";
//import * as React from "react";
import api from "../utils/api";
//const fetch = require("node-fetch");
import fetch from "node-fetch";
//import { NextWeek } from "@material-ui/icons";

export default async (req: express.Request, res: express.Response) => {
  console.log("testにきている");

  let retValue = null;
  let url = "https://covid19-japan-web-api.now.sh/api//v1/total";
  let options = {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  var retRes = await fetch(url, options);
  var status = await retRes.status;
  var responseBody = await retRes.json();
  console.log("responseBody=" + JSON.stringify(responseBody));

  //----------------------------------
  let xxx: string;
  await api
    .get(url)
    .then((data) => {
      //alert(data);
      xxx = JSON.stringify(data);
      console.log("xxx=" + xxx);
    })
    .catch((error) => {
      console.log(error);
    });
  //----------------------------------

  const head: object = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let xxx2: string;
  await api
    .getHead(url, head)
    .then((data) => {
      //alert(data);
      xxx2 = JSON.stringify(data);
      console.log("xxx2=" + xxx2);
    })
    .catch((error) => {
      console.log(error);
    });
  //----------------------------------

  res.json({
    success: true,
    message: "Ok Authenticate",
    data: responseBody,
  });
};
