import React, { Component, useEffect } from "react";
import "../Stylefolder/WriteForm.css";
import { Link, withRouter, Redirect } from "react-router-dom";
import { assertValidExecutionArguments } from "graphql/execution/execute";
import axios from "axios";
import { LoneSchemaDefinitionRule } from "graphql";
import { SERVER_URL } from "../utils/URL";
class WriteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multipartFileList: null,
      title: "",
      content: "",
    };
    this.updatedata = this.updatedata.bind(this);
    this.updatetext = this.updatetext.bind(this);
    this.updatefile = this.updatefile.bind(this);
    this.filesending = this.filesending.bind(this);
  }
  updatedata = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  updatetext = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  updatefile = (e) => {
    this.setState({
      multipartFileList: e.target.files[0],
    });
  };
  filesending = () => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;
    const frm = new FormData();
    const { params } = this.props.match;
    console.log(this.state.Title);
    frm.append("title", this.state.title);
    frm.append("content", this.state.content);
    if (this.state.multipartFileList === null) {
    } else frm.append("multipartFileList", this.state.multipartFileList);
    axios
      .post(SERVER_URL + "/post/freeboard" /*+ params.category*/, frm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("전송완료");
        alert("글쓰기 완료");
        <Redirect to="this.props.location.pathname" />;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="Write_form">
        <h1>게시판 작성</h1>
        <li className="Titleinput">
          <form>
            <input
              defaultValue={"제목"}
              type="text"
              onChange={this.updatedata}
            ></input>
          </form>
        </li>
        <li className="Contentinput">
          <form>
            <input type="text" onChange={this.updatetext}></input>
          </form>
        </li>
        <li>
          <form>
            <input type="file" onChange={this.updatefile}></input>
          </form>
        </li>
        <button onClick={this.filesending}>글쓰기</button>
      </div>
    );
  }
}

export default withRouter(WriteForm);
