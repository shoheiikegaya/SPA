import React, { useEffect, useState, useContext } from "react";
import { AuthContext, UserContext } from "./components/AuthContextProvider";

type Props = {
  last_name: string;
  first_name: string;
};

export const HelloWorld = (props: Props) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);
  const increment = () => alert(auth);
  useEffect(() => {
    alert(user?.userId);
    alert(auth);
  }, []);
  return (
    <>
      <p>{`Hello ${props.last_name} ${props.first_name} !!2`}</p>
      <button type="button" onClick={increment}>
        auth確認
      </button>
    </>
  );
};
