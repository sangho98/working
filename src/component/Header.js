import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faPowerOff,
  faUserFriends,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Modal, FormControl, Form, Nav, Navbar } from "react-bootstrap";
import { GetMessage, SendMessage } from "../utils/ApiConfig";
import { messageAlram, tokenData } from "../Apollo";
import Friend from "./Friend";
import Dinner from "./Dinner";
import Message from "./Message";

const Headalign = styled.div`
  width: 100%;
  height: 60px;
`;

const MessageShow = (props) => {
  const { data, setModalShow, typeModal, setTypeModal, prop } = props;
  const [pageNum, setPageNum] = useState(0);
  const [pageNumEnd, setPageNumEnd] = useState(5);
  const [show, setShow] = useState(true);
  const [messageId, setMessageId] = useState(null);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {typeModal === "1" || typeModal === "2" ? (
          <Modal.Title id="contained-modal-title-vcenter">쪽지함</Modal.Title>
        ) : typeModal === "3" ? (
          <Modal.Title id="contained-modal-title-vcenter">
            친구 목록
          </Modal.Title>
        ) : (
          <Modal.Title id="contained-modal-title-vcenter">
            오늘의 급식
          </Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        {typeModal === "1" || typeModal === "2" ? (
          <Message
            pageNum={pageNum}
            pageNumEnd={pageNumEnd}
            setTypeModal={setTypeModal}
            setMessageId={setMessageId}
            messageId={messageId}
            typeModal={typeModal}
            prop={prop}
          />
        ) : typeModal === "3" ? (
          <Friend prop={prop} />
        ) : (
          <Dinner prop={prop} />
        )}
      </Modal.Body>
      <Modal.Footer>
        {typeModal === "1" ? (
          <Button
            onClick={() => {
              if (pageNum <= 0) {
              } else {
                setPageNum(pageNum - 5);
                setPageNumEnd(pageNumEnd - 5);
              }
            }}
          >
            Prev
          </Button>
        ) : null}
        {typeModal === "1" ? (
          <Button
            onClick={() => {
              setPageNum(pageNum + 5);
              setPageNumEnd(pageNumEnd + 5);
            }}
          >
            Next
          </Button>
        ) : null}

        <Button
          onClick={() => {
            setModalShow(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function Header(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [typeModal, setTypeModal] = useState(true);

  const data = tokenData();

  if (
    props.history.location.pathname === "/login" ||
    props.history.location.pathname === "/register"
  ) {
    return null;
  } else {
    return (
      <Headalign>
        <clientSet></clientSet>

        <MessageShow
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={data}
          typeModal={typeModal}
          setModalShow={setModalShow}
          setTypeModal={setTypeModal}
          prop={props}
        ></MessageShow>

        <Navbar bg="secondary" variant="dark" style={{ height: "60px" }}>
          <Link to="/">
            <Navbar.Brand>HighSchool Time</Navbar.Brand>
          </Link>
          <Nav className="mr-auto"></Nav>

          <Nav>
            <FontAwesomeIcon
              icon={faUtensils}
              style={{ paddingRight: "13px" }}
              color="white"
              size="2x"
              onClick={() => {
                setTypeModal("4");
                setModalShow(true);
              }}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faUserFriends}
              style={{ paddingRight: "13px" }}
              color="white"
              size="2x"
              onClick={() => {
                setTypeModal("3");
                setModalShow(true);
              }}
            ></FontAwesomeIcon>

            <FontAwesomeIcon
              icon={faCommentDots}
              style={{ paddingRight: "13px" }}
              color="white"
              size="2x"
              onClick={() => {
                setTypeModal("1");
                setModalShow(true);
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
      </Headalign>
    );
  }
}

export default Header;
