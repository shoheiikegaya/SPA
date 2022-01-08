import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export const AuthContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);
export const UserContext = React.createContext<
  [User | undefined, React.Dispatch<React.SetStateAction<User | undefined>>]
>([undefined, () => {}]);

type User = {
  userId: string;
};

export const AuthContextProvider: React.FC<{}> = (props) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>();

  const history = useHistory();

  useEffect(() => {
    if (auth) {
      //setAuth(true);
    } else {
      //setAuth(false);
      //history.push("/");
    }
    //alert("auth=" + auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <UserContext.Provider value={[user, setUser]}>
        {props.children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};
