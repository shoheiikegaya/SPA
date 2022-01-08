import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { getCovid19Total } from "./func/covid19";

import SomeImg from "./img/covid19.jpg";

import {
  AuthContext,
  AuthContextProvider,
  UserContext,
} from "./components/AuthContextProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export const Covid19: React.FC = (): JSX.Element => {
  const [count, setCounter] = useState<number>(0);
  const reset = () => setCounter(0);

  const [date, setDate] = useState("");
  const [positive, setPositive] = useState(0);
  const [hospitalize, setHospitalize] = useState(0);
  const [severe, setSevere] = useState(0);
  const [death, setDeath] = useState(0);

  const [auth, setAuth] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    let retObj = getCovid19Total().then((data: any) => {
      let jsonValue = JSON.stringify(data);
      console.log(jsonValue);
      setDate(data.data.date);
      setPositive(data.data.positive);
      setHospitalize(data.data.hospitalize);
      setSevere(data.data.severe);
      setDeath(data.data.death);

      //alert("AuthContext=" + auth);
      //alert(user);
      //if (user) {
      //  alert(user["userId"]);
      //}

      //let userPass = JSON.stringify(user);
      //alert("UserContext=" + userPass);
      if (user) {
        setUser({ userId: user["userId"] });
      }
    });
  }, []);

  const renewal = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    let retObj = getCovid19Total().then((data: any) => {
      let jsonValue = JSON.stringify(data);
      console.log(jsonValue);
      //alert("jsonValue=" + jsonValue);
      const bufJson = JSON.parse(jsonValue);
      const bufSuccess = bufJson["success"];

      setDate(data.data.date);
      setPositive(data.data.positive);
      setHospitalize(data.data.hospitalize);
      setSevere(data.data.severe);
      setDeath(data.data.death);

      if (user) {
        //alert("UserContext2=" + user["userId"]);
        setUser({ userId: user["userId"] });
      }

      setAuth(bufSuccess);

      //history.push("/");
    });
  };

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const bull2 = <span className={classes.bullet}>{date}</span>;

  return (
    <div>
      <a href="/">login</a>
      <Button variant="contained" onClick={renewal}>
        更新
      </Button>
      <div className="c-section-container">
        <h2>Covid19</h2>

        <div className="module-spacer--medium"></div>

        <div style={{ width: "100%", height: "300px" }}>
          <div className="center">
            <h2>Covid19サマリー</h2>
          </div>
          <div className="module-spacer--medium"></div>

          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={SomeImg}
              title="Covid19"
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                日付：{date}
              </Typography>
              <Typography variant="h5" component="h2">
                感染者数：{positive}
              </Typography>
              <Typography variant="h5" component="h2">
                入院者数：{hospitalize}
              </Typography>
              <Typography variant="h5" component="h2">
                重症者数：{severe}
              </Typography>
              <Typography variant="h5" component="h2">
                死亡者数：{death}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

//export default Covid19;
