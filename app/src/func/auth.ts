export async function auth(
  emailVal: string | undefined,
  passwordVal: string | undefined
) {
  let data = { email: emailVal, password: passwordVal };
  const data2 = { email: "test1@test.com", password: "pass1" };
  let returnValue: any;
  await fetch("http://localhost:3000/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      returnValue = data;
    })
    .catch((error) => {
      console.log("There is some error=" + error);
      //alert("There is some error=" + error);
    });

  return JSON.stringify(returnValue);
}
