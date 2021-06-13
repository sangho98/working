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
import {
  BoardBody,
  BoardFooter,
  BoardHeader,
  BoardInner,
  BoardItem,
  BoardList,
  BoardTitle,
  LinkButton,
  Pagenation,
  Wrapper,
} from "./FreeBoard";

class infoboard extends React.Component {
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
        .get(SERVER_URL + "/post/infoboard?page=" + (this.state.page_count - 1))
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
      .get(SERVER_URL + "/post/infoboard?page=" + (this.state.page_count + 1))
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
      .get(SERVER_URL + "/post/infoboard?page=" + this.state.page_count)
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

  DeleteBoard = async ({ id }) => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .delete(SERVER_URL + `/post/infoboard/${id}`)
      .then((res) => {
        if (res.data === "failed") {
          alert("내가 쓴 글이 아닙니다.");
        } else {
          alert("삭제 완료");
          <Redirect to="this.props.location.pathname" />;
        }
      })
      .catch((err) => {
        alert("내가 쓴 글이 아닙니다.");
        console.log(err);
      });
  };
  render() {
    return (
      <Wrapper>
        <BoardInner>
          <BoardTitle>정보게시판</BoardTitle>
          <BoardList>
            {this.state.boards.map((board) => (
              <BoardItem>
                <BoardHeader>
                  <Link to={`/post/freeboard/${board.id}`}>
                    <span style={{ color: "black", fontWeight: "700" }}>
                      {board.title}
                    </span>
                  </Link>
                </BoardHeader>
                <BoardBody>{board.content}</BoardBody>
                <BoardFooter>
                  <span id="content_like" style={{ fontSize: "20px" }}>
                    ♥ {board.likecount}
                  </span>
                  <button
                    onClick={() => {
                      this.DeleteBoard({ id: board.id });
                    }}
                    style={{
                      border: "none",
                      backgroundColor: "white",
                    }}
                  >
                    💬 {board.commentDTOList.length}
                  </button>
                </BoardFooter>
              </BoardItem>
            ))}
          </BoardList>
          <Link to="/post/freeboard/writeform">
            <LinkButton>글쓰기</LinkButton>
          </Link>
          <Pagenation>
            <button
              style={{
                backgroundColor: "#03c7f5",
                border: "none",
                color: "white",
                marginRight: "5px",
              }}
              onClick={this.moveprevPage}
            >
              &lt;
            </button>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0",
              }}
            >
              {this.state.page_count}
            </p>

            <button
              style={{
                backgroundColor: "#03c7f5",
                border: "none",
                color: "white",
                marginLeft: "5px",
              }}
              onClick={this.movenextPage}
            >
              &gt;
            </button>
          </Pagenation>
        </BoardInner>
      </Wrapper>
    );
  }
}

export default withRouter(infoboard);
