import React, { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faPowerOff,
  faUserFriends,
  faUtensils,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { Button, Modal, FormControl, Form, Nav, Navbar } from "react-bootstrap";
import { logged, tokenData, udata } from "../Apollo";
import Friend from "./Friend";
import Message from "./Message";
import Schedule from "./Schedule";
import Dinner from "./Dinner";

const Headalign = styled.div`
  background-color: #03c7f5;
`;
const HeaderInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;
const MessageShow = (props) => {
  const { setmodalshow, typemodal, settypemodal, prop } = props;
  const [pageNum, setPageNum] = useState(1);
  const [pageNumEnd, setPageNumEnd] = useState(5);
  const [messageId, setMessageId] = useState(null);
  const [tempid, settempid] = useState(null);
  const [abc, setabc] = useState(false);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {typemodal === "1" || typemodal === "2" ? (
          <Modal.Title id="contained-modal-title-vcenter">쪽지함</Modal.Title>
        ) : typemodal === "3" ? (
          <Modal.Title id="contained-modal-title-vcenter">
            친구 목록
          </Modal.Title>
        ) : typemodal === "4" ? (
          <Modal.Title id="contained-modal-title-vcenter">
            오늘의 급식
          </Modal.Title>
        ) : (
          <Modal.Title id="contained-modal-title-vcenter">시간표</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        {typemodal === "1" || typemodal === "2" || typemodal === "6" ? (
          <Message
            pageNum={pageNum}
            pageNumEnd={pageNumEnd}
            settypemodal={settypemodal}
            setMessageId={setMessageId}
            messageId={messageId}
            typemodal={typemodal}
            prop={prop}
            settempid={settempid}
            tempid={tempid}
            setabc={setabc}
            abc={abc}
          />
        ) : typemodal === "3" ? (
          <Friend prop={prop} />
        ) : typemodal === "4" ? (
          <Dinner prop={prop} />
        ) : (
          <Schedule prop={prop} />
        )}
      </Modal.Body>
      <Modal.Footer>
        {typemodal === "1" ? (
          <Button
            onClick={() => {
              if (pageNum <= 0) {
                console.log("첫페이지");
              } else {
                if (pageNum === 1) {
                } else {
                  setPageNum(pageNum - 1);
                  setabc(true);
                }
              }
            }}
          >
            Prev
          </Button>
        ) : null}
        {typemodal === "1" ? (
          <Button
            onClick={() => {
              setPageNum(pageNum + 1);
              setabc(true);
            }}
          >
            Next
          </Button>
        ) : null}
        {typemodal === "2" ? (
          <Button
            onClick={() => {
              settypemodal("6");
            }}
          >
            답장
          </Button>
        ) : null}

        <Button
          onClick={() => {
            setmodalshow(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function Header(props) {
  const [modalshow, setmodalshow] = useState(false);
  const [typemodal, settypemodal] = useState(null);

  const data = tokenData();

  if (
    props.history.location.pathname === "/login" ||
    props.history.location.pathname === "/register"
  ) {
    return null;
  } else {
    return (
      <Headalign>
        <HeaderInner>
          <MessageShow
            show={modalshow}
            onHide={() => {
              setmodalshow(false);
            }}
            data={data}
            typemodal={typemodal}
            setmodalshow={setmodalshow}
            settypemodal={settypemodal}
            prop={props}
          ></MessageShow>
          <Navbar variant="dark" style={{ height: "60px", padding: 0 }}>
            <Link to="/">
              <Navbar.Brand>HighSchool Time</Navbar.Brand>
            </Link>

            <Nav className="justify-content-end">
              <FontAwesomeIcon
                icon={faUserFriends}
                style={{ paddingRight: "13px" }}
                color="white"
                size="2x"
                onClick={() => {
                  settypemodal("3");
                  setmodalshow(true);
                }}
              ></FontAwesomeIcon>

              <FontAwesomeIcon
                icon={faCommentDots}
                style={{ paddingRight: "13px" }}
                color="white"
                size="2x"
                onClick={() => {
                  settypemodal("1");
                  setmodalshow(true);
                }}
              ></FontAwesomeIcon>

              <Link to="/">
                <FontAwesomeIcon
                  icon={faPowerOff}
                  style={{ paddingRight: "13px" }}
                  color="white"
                  size="2x"
                  onClick={() => {
                    localStorage.removeItem("TOKEN");
                    tokenData(null);
                    <Redirect to="/" />;
                  }}
                ></FontAwesomeIcon>
              </Link>

              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-light">검색</Button>
              </Form>
            </Nav>
          </Navbar>
        </HeaderInner>
      </Headalign>
    );
  }
}

export default Header;
