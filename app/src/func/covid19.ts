import * as React from "react";

export async function getCovid19Positives() {
  let url = "https://covid19-japan-web-api.now.sh/api/v1/positives";
  let options = {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  var res = await fetch(url, options);
  var status: number = await res.status;
  var responseBody: any = await res.json();

  console.log(responseBody);
  return JSON.stringify(responseBody);
}

export async function getCovid19Total() {
  let url = "https://covid19-japan-web-api.now.sh/api//v1/total";

  let headers = new Headers();
  headers.append("Authorization", "Bearer " + localStorage.getItem("token"));
  //alert(localStorage.getItem("token"));
  let bufToken: string | null = localStorage.getItem("token");
  if (bufToken != null) {
    bufToken = bufToken.replace(/^"(.*)"$/, "$1");
  }

  let returnValue;
  await fetch("http://localhost:3000/covid19", {
    method: "GET",
    headers: { Authorization: "Bearer " + bufToken },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      returnValue = data;
      //alert("returnValue=" + JSON.stringify(returnValue));
    })
    .catch((error) => {
      console.log("There is some error=" + error);
    });

  return returnValue;
}
