import React, { Component, useEffect } from "react";
import "../Stylefolder/WriteForm.css";
import { Link, withRouter, Redirect } from "react-router-dom";
import { assertValidExecutionArguments } from "graphql/execution/execute";
import axios from "axios";
import { LoneSchemaDefinitionRule } from "graphql";
import { SERVER_URL } from "../utils/URL";
import styled from "styled-components";
const Wrapper = styled.div`
  min-height: 100vh;
`;
const WriteFormInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 100px;
`;
const WriteFormLi = styled.li`
  min-width: 400px;
`;
const WriteFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
class WriteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multipartFileList: null,
      title: "",
      content: "",
      wharboard: this.props.match.params.category,
    };
    this.updatedata = this.updatedata.bind(this);
    this.updatetext = this.updatetext.bind(this);
    this.updatefile = this.updatefile.bind(this);
    this.filesending = this.filesending.bind(this);
    this.history = this.props.history;
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
  filesending = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;
    const frm = new FormData();

    frm.append("title", this.state.title);
    frm.append("content", this.state.content);
    if (this.state.multipartFileList === null) {
    } else frm.append("multipartFileList", this.state.multipartFileList);
    axios
      .post(SERVER_URL + `/post/${this.state.wharboard}`, frm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        this.history.push(`/post/${this.state.wharboard}/${response.data}`);
        console.log(this.history);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Wrapper>
        <WriteFormInner>
          <form onSubmit={this.filesending}>
            <WriteFormWrapper>
              <WriteFormLi>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  onChange={this.updatedata}
                  style={{ height: "50px", outline: "none" }}
                ></input>
              </WriteFormLi>
              <WriteFormLi className="Contentinput">
                <input
                  type="text"
                  placeholder="✏️게시글을 작성해주세요"
                  onChange={this.updatetext}
                  style={{ height: "350px", outline: "none" }}
                ></input>
              </WriteFormLi>
              <WriteFormLi>
                <label
                  for="file-upload"
                  style={{
                    backgroundColor: "#e9e9e9",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "5px",
                    color: "grey",
                  }}
                >
                  사진 업로드
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={this.updatefile}
                  style={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: "0",
                    margin: "-1px",
                    overflow: "hidden",
                    border: "0",
                    clip: "rect(0,0,0,0)",
                  }}
                ></input>
              </WriteFormLi>
              <button
                onClick={this.filesending}
                style={{
                  display: "flex",
                  width: "400px",
                  borderRadius: "5px",
                  justifyContent: "center",
                }}
              >
                글쓰기
              </button>
            </WriteFormWrapper>
          </form>
        </WriteFormInner>
      </Wrapper>
    );
  }
}

export default withRouter(WriteForm);
