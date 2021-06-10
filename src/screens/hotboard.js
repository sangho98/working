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
import { GetArticle, GetUserInfo } from "../utils/ApiConfig";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { Jumbotron } from "react-bootstrap";
import { SERVER_URL } from "../utils/URL";

class hotboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page_count: 1,
      boards: [],
    };
    // <Link to = `dwqjqfqf${page}'
  }
  prevPage = () => {
    if (this.state.page_count === 1) {
    } else {
      let token = localStorage.getItem("TOKEN");
      axios.defaults.headers.common["Authorization"] = token;

      axios
        .get(SERVER_URL + "/post/hotboard?page=" + (this.state.page_count - 1))
        .then(({ data }) => {
          console.log(data);
          this.setState({
            boards: data,
          });
          console.log(this.state.boards);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };
  nextPage = () => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .get(SERVER_URL + "/post/hotboard?page=" + (this.state.page_count + 1))
      .then(({ data }) => {
        console.log(data);
        this.setState({
          boards: data,
        });
        console.log(this.state.boards);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  LoadBoard = async () => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .get(SERVER_URL + "/post/hotboard?page=" + this.state.page_count)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          boards: data,
        });
        console.log(this.state.boards);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  movenextPage = () => {
    this.nextPage();
    this.upcount();
  };
  moveprevPage = () => {
    this.prevPage();
    this.downcount();
  };
  upcount = () => {
    this.setState({
      page_count: this.state.page_count + 1,
    });
    console.log(this.state.page_count);
  };
  downcount = () => {
    if (this.state.page_count === 1) {
      this.setState({
        page_count: this.state.page_count,
      });
    } else
      this.setState({
        page_count: this.state.page_count - 1,
      });
  };
  componentDidMount() {
    this.LoadBoard();
  }

  render() {
    return (
      <div>
        <h2 className="text-center">HOT게시판</h2>
        <div className="row">
          <table className="FreeTable">
            <thead></thead>
            <tbody>
              {this.state.boards.map((board) => (
                <tr key={board.id} id="content_content">
                  <Link to={`/post/hotboard/${board.id}`}>
                    <td id="content_title">{board.title}</td>
                  </Link>
                  <tr>
                    <td id="content_text">{board.content}</td>
                  </tr>
                  <tr></tr>
                  <td id="content_like">♥ {board.likecount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav className="page_nav">
          <div>
            <p>{this.state.page_count}</p>
            <button onClick={this.moveprevPage}>&lt;</button>
            <button onClick={this.movenextPage}>&gt;</button>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(hotboard);
