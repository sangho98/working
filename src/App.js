import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Auth from "./screens/Auth";
import Register from "./screens/Register";
import Header from "./component/Header";
import Confirm from "./screens/Confirm";
import Footer from "./component/Footer";
import Main from "./screens/Main";
import Logout from "./screens/Logout";
import UserInfo from "./screens/UserInfo";
import WriteForm from "./screens/WriteForm";
import Content from "./screens/Content";
import FreeBoard from "./screens/FreeBoard";
import Letter from "./screens/Letter";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { client } from "./utils/ApiConfig";
import { Container, Row } from "react-bootstrap";

function App() {
  useEffect(client);

  console.log("Enter App()");
  console.log("Heroku Test");

  return (
    <Container fluid>
      <Router>
        <Row>
          <Route
            path="*"
            component={(props) => {
              return <Header {...props} />;
            }}
          />
        </Row>
        <Row>
          <Switch>
            <Route
              path="/"
              component={(props) => {
                return <Main {...props} />;
              }}
              exact
            />
            <Route
              path="/post/:category/writeform"
              component={(props) => {
                return <WriteForm {...props}></WriteForm>;
              }}
              exact
            ></Route>
            <Route
              path="/post/freeboard/:num"
              component={(props) => {
                return <Content {...props}></Content>;
              }}
              exact
            ></Route>
            <Route
              path="/post/:boardname"
              component={(props) => {
                return <FreeBoard {...props}></FreeBoard>;
              }}
              exact
            ></Route>
            <Route
              path="/post/freeboard/letter/:num"
              component={(props) => {
                return <Letter {...props}></Letter>;
              }}
              exact
            ></Route>
            <Route
              path="/login"
              component={(props) => {
                return <Login {...props} />;
              }}
            />
            <Route
              path="/logout"
              component={() => {
                return <Logout />;
              }}
            />
            <Route
              path="/register"
              component={(props) => {
                return <Register {...props} />;
              }}
            />
            <Route
              path="/user"
              component={(props) => {
                return <UserInfo {...props} />;
              }}
            />
            <Route
              path="/auth"
              component={(props) => {
                return <Auth {...props} />;
              }}
            ></Route>
            <Route
              path="/confirm-email"
              component={(props) => {
                return <Confirm {...props} />;
              }}
            ></Route>

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Row>
        <Row style={{ borderTop: "1px solid gray", marginTop: "2rem" }}>
          <Footer />
        </Row>
      </Router>
    </Container>
  );
}

export default App;
