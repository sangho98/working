import React, { Component, useEffect } from "react";
import "../Stylefolder/FreeBoard.css";
import { Link, withRouter, Redirect } from "react-router-dom";
import { assertValidExecutionArguments } from "graphql/execution/execute";
import axios from "axios";
import { LoneSchemaDefinitionRule } from "graphql";

import Tab from "react-bootstrap/Tab";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { LinkContainer } from "react-router-bootstrap";
import { GetArticle, GetUserInfo, SendMessage } from "../utils/ApiConfig";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { Jumbotron } from "react-bootstrap";
import { SERVER_URL } from "../utils/URL";

class Letter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      boards: [],
      ToID: this.props.match.params.num,
    };
  }
  MessageSending = async () => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .post(SERVER_URL + "/message/1" + `${this.state.ToID}`, {
        content: this.state.content,
      })
      .then((res) => {
        if (res.data === "failed") {
        } else {
          alert("쪽지 전송 완료");
          console.log(this.props.location.pathname);
          <Redirect to="this.props.location.pathname" />;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  updateletter = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <input type="text" onChange={this.updateletter}></input>
        <button onClick={this.MessageSending}>보내기</button>
      </div>
    );
  }
}

export default withRouter(Letter);
