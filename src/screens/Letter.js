import React from "react";
import "../Stylefolder/FreeBoard.css";
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from "axios";

import { SERVER_URL } from "../utils/URL";
import styled from "styled-components";
const Wrapper = styled.div`
  min-height: 100vh;
`;
const Inner = styled.div`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
`;
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
      .post(SERVER_URL + "/message/" + `${this.state.ToID}`, {
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
      <Wrapper>
        <Inner>
          <input
            placeholder="텍스트를 입력해주세요"
            type="text"
            onChange={this.updateletter}
            style={{ padding: "10px", outline: "none" }}
          ></input>
          <button
            style={{
              width: "100%",
              backgroundColor: "#03c7f5",
              color: "white",
              marginTop: "10px",
              borderRadius: "10px",
              border: "none",
            }}
            onClick={this.MessageSending}
          >
            보내기
          </button>
        </Inner>
      </Wrapper>
    );
  }
}

export default withRouter(Letter);
