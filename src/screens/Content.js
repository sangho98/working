import React, { Component, useEffect } from "react";
import "../Stylefolder/Content.css";
import { Link, Redirect, withRouter } from "react-router-dom";
import { assertValidExecutionArguments } from "graphql/execution/execute";
import axios from "axios";
import { LoneSchemaDefinitionRule } from "graphql";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { SERVER_URL } from "../utils/URL";
import { getOperationDefinition } from "@apollo/client/utilities";
import Letter from "./Letter";
import { Modals } from "react-bootstrap";
import styled from "styled-components";
const Wrapper = styled.div`
  min-height: 100vh;
`;
const ContentInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 50px;
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #e9e9e9;
`;
const ContentHeader = styled.div`
  min-height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  padding: 5px;
  font-size: 20px;
`;
const ContentBody = styled.div`
  height: 400px;
  display: flex;
  padding: 20px 5px;
`;
const ContentFooter = styled.div`
  height: 100px;
  display: flex;
  position: relative;
`;
const ContentFooterImage = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  margin-bottom: 5px;
  padding: 0 10px;
`;
const ContentLikeForm = styled.div``;
const ReplyWriteForm = styled.div`
  margin-top: 10px;
  border-radius: 5px;
  max-width: 600px;
  margin: 10px auto;
  position: relative;
`;
const ReplyInput = styled.input`
  max-height: 40px;
  padding: 5px;
  outline: none;
  padding-right: 40px;
`;
const ReplyButton = styled.button`
  height: 100%;
  width: 40px;
  height: 40px;
  font-size: 14px;
  background-color: white;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  position: absolute;
  right: 0;
  bottom: 0;
`;
const ReplyWrapper = styled.div`
  max-width: 600px;
  margin: 10px auto;
`;
const ReplyList = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReplyListItem = styled.div`
  margin-bottom: 10px;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  padding: 10px;
`;
const ReplyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
  border-bottom: 1px solid #e9e9e9;
`;
const ReplyBody = styled.div`
  padding: 10px 0;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
`;

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(props);
    this.state = {
      content_num: 1,
      boards: [],
      comment: [],
      writeco: "",
      ModalOn: false,
      abc: false,
      isLiked: false,
      picture: [],
    };
  }

  LoadContent = async () => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;
    const { params } = this.props.match;
    axios
      .get(SERVER_URL + "/post/" + params.boardlist + "/" + params.num)
      .then(({ data }) => {
        this.setState({
          boards: data,
          comment: data.commentDTOList,
          picture: data.uploadFileDTOList,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  Sendcomment = async () => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;
    const { params } = this.props.match;
    axios
      .post(SERVER_URL + "/post/" + params.num + "/comment", {
        content: this.state.writeco,
      })
      .then((res) => {
        if (res.data === "failed") {
        } else {
          this.setState({ abc: true });
          this.props.history.push(this.props.location.pathname);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  Sendlike = async ({ id }) => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .get(SERVER_URL + `/post/freeboard/${id}/like`)
      .then((res) => {
        if (res.data === "failed") {
        } else {
          <Redirect to="this.props.location.pathname" />;
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      });
  };

  Friendplz = async ({ id }) => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get(SERVER_URL + `/user/${id}`)
      .then((res) => {
        if (res.data === "failed") {
          alert("요청실패");
        } else {
          alert("요청완료");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.LoadContent();
  }

  change_reply = (e) => {
    this.setState({
      writeco: e.target.value,
    });
  };

  openModal = () => {
    this.setState({
      ModalOn: true,
    });
  };
  closeModal = () => {
    this.setState({
      ModalOn: false,
    });
  };
  DeleteBoard = async ({ id }) => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .delete(SERVER_URL + `/post/${id}`)
      .then((res) => {
        if (res.data === "failed") {
          alert("작성자만 삭제할 수 있습니다.");
        } else {
          this.props.history.push(this.props.location.pathname);
          // <Redirect to="this.props.location.pathname" />;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  gotoLetter() {}
  componentDidUpdate() {
    if (this.state.abc) {
      this.LoadContent();
      this.setState({ abc: false });
    }
  }
  setIsLiked() {
    this.setState({ isLiked: !this.state.isLiked });
  }
  render() {
    function comment_id(id) {
      if (id === -1) return "글쓴이";
      else return "익명" + id;
    }
    return (
      <Wrapper>
        <ContentInner>
          <ContentWrapper>
            <ContentHeader>{this.state.boards.title}</ContentHeader>
            <ContentBody>{this.state.boards.content}</ContentBody>
            <ContentFooter>
              <ContentFooterImage>
                {this.state.picture.map((pic) => {
                  return (
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        marginRight: "10px",
                        borderRadius: "10px",
                      }}
                      src={pic.fileDownloadUri}
                    ></img>
                  );
                })}
              </ContentFooterImage>
              <ContentLikeForm>
                <button
                  onClick={() => {
                    this.setIsLiked();
                    this.Sendlike({ id: this.state.boards.id });
                  }}
                  style={{
                    backgroundColor: this.state.isLiked ? "red" : "#e9e9e9",
                    border: "none",
                    borderRadius: "5px",
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    width: "38px",
                    marginRight: "5px",
                    marginBottom: "5px",
                  }}
                >
                  ♡
                </button>
              </ContentLikeForm>
            </ContentFooter>
          </ContentWrapper>
          <ReplyWrapper>
            <ReplyList>
              {this.state.comment.map((board) => (
                <ReplyListItem>
                  <Modal show={this.state.ModalOn} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>원하는 활동을 선택하세요.</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                      <Link to={`/post/freeboard/letter/${board.userId}`}>
                        <button variant="secondary" onClick={this.closeModal}>
                          쪽지보내기
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          this.Friendplz({ id: board.userId });
                        }}
                      >
                        친구 요청
                      </button>
                    </Modal.Footer>
                  </Modal>
                  <ReplyHeader>
                    <button
                      onClick={this.openModal}
                      style={{
                        backgroundColor: "white",
                        border: "none",
                        fontSize: "12px",
                        color: "black",
                      }}
                    >
                      {comment_id(board.userCount)}
                    </button>
                    <button
                      onClick={() => {
                        this.DeleteBoard({ id: board.id });
                      }}
                      style={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "12px",
                      }}
                    >
                      ❌
                    </button>
                  </ReplyHeader>
                  <ReplyBody>{board.content}</ReplyBody>
                </ReplyListItem>
                // <tr>
                //   <td className="comment_user">

                // <Modal show={this.state.ModalOn} onHide={this.closeModal}>
                //   <Modal.Header closeButton>
                //     <Modal.Title>원하는 활동을 선택하세요.</Modal.Title>
                //   </Modal.Header>

                //   <Modal.Footer>
                //     <Link to={`/post/freeboard/letter/${board.userId}`}>
                //       <button variant="secondary" onClick={this.closeModal}>
                //         쪽지보내기
                //       </button>
                //     </Link>
                //     <button
                //       onClick={() => {
                //         console.log(board.userId);
                //         this.Friendplz({ id: board.userId });
                //       }}
                //     >
                //       친구 요청
                //     </button>
                //   </Modal.Footer>
                // </Modal>
                //   </td>
                // </tr>
                // <tr>
                //   <td className="comment_text">{board.content}</td>
                // </tr>
                // <button
                //   onClick={() => {
                //     this.DeleteBoard({ id: board.id });
                //   }}
                // >
                //   삭제
                // </button>
                // <p></p>
              ))}
            </ReplyList>
          </ReplyWrapper>

          <ReplyWriteForm>
            <ReplyInput onChange={this.change_reply}></ReplyInput>
            <ReplyButton onClick={this.Sendcomment}>🖊</ReplyButton>
          </ReplyWriteForm>
        </ContentInner>
      </Wrapper>
    );
  }
}

export default withRouter(Content);
//<Link to={`/post/freeboard/letter/${board.userId}`}></Link>
