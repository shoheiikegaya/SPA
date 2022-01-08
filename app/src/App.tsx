import React, { useContext, useEffect } from "react";
import {
  AuthContext,
  AuthContextProvider,
  UserContext,
} from "./components/AuthContextProvider";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import { HelloWorld } from "./HelloWorld";
import { Counter } from "./Counter";
import { Covid19 } from "./Covid19";

export const App: React.FC = (): JSX.Element => {
  const [auth, setAuth] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);

  const history = useHistory();
  useEffect(() => {
    //alert(user?.userId);
    // リダイレクト
    //history.push("/login");
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <div>
              {auth ? <Covid19 /> : <Login />}
              {/*
              <HelloWorld last_name="NAMONAI" first_name="P" />
              <Counter />
              <Covid19 />
              */}
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
