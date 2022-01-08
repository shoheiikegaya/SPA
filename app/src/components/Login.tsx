import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext, UserContext } from "./AuthContextProvider";

import { auth } from "../func/auth";

import { getCovid19Total } from "../func/covid19";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

/**
 * ログイン、または会員登録処理を管理するコンポーネント
 * @returns
 */
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  // 以下の書き方で他のコンポーネントから共通の認証情報を取得できる
  const [authVal, setAuth] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);

  /**
   * サインインのリクエストをサーバーに送り、成功した場合TOPページにリダイレクト
   * @param e
   */
  const signIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // 以下サーバーなしの擬似的なサインイン
    const userId = `${email}_${password}`;
    setUser({ userId: userId });

    let returnValue: any;
    returnValue = await auth(email, password);

    //alert(JSON.stringify(returnValue));
    returnValue = JSON.parse(returnValue);

    //alert(returnValue["success"]);
    //alert(returnValue["data"]);

    if (returnValue["success"] == true) {
      localStorage.setItem("token", returnValue["data"]);
      setAuth(true);
      if (email != undefined) {
        setUser({ userId: email });
      }
    } else {
    }

    // リダイレクト
    history.push("/");
    //sleep();
  };

  /**
   * メールアドレスの変更ハンドラ
   * @param e
   */
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  /**
   * パスワードの変更ハンドラ
   * @param e
   */
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div>
        <form>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                id="username"
                name="username"
                value={email}
                onChange={changeEmail}
                label="e-mail"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                id="password"
                name="password"
                value={password}
                onChange={changePassword}
                label="password"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Button variant="contained" onClick={signIn}>
            ログイン
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
