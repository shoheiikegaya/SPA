import * as express from "express";
import api from "../utils/api";
import fetch from "node-fetch";

export default async (req: express.Request, res: express.Response) => {
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

  /*----------------------------------
  await api
    .get(url)
    .then((data) => {
      let ret = JSON.stringify(data);
      console.log("return=" + ret);
    })
    .catch((error) => {
      console.log(error);
    });
  ----------------------------------*/

  /*----------------------------------
  const head: object = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  await api
    .getHead(url, head)
    .then((data) => {
      let ret = JSON.stringify(data);
      console.log("return=" + ret);
    })
    .catch((error) => {
      console.log(error);
    });
  ----------------------------------*/

  res.json({
    success: true,
    message: "Ok Authenticate",
    data: responseBody,
  });
};
