import React from "react";
import "../Stylefolder/FreeBoard.css";
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from "axios";

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
      <div>
        <input type="text" onChange={this.updateletter}></input>
        <button onClick={this.MessageSending}>보내기</button>
      </div>
    );
  }
}

export default withRouter(Letter);
