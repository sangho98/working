import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { GetMessage, SendMessage } from "./ApiConfig";
import { messageAlram, tokenData } from "../Apollo";
import Friend from "../component/Friend";
import Dinner from "../component/Dinner";
import Message from "../component/Message";

function MessageShow(props) {
  const { data, setModalShow, typeModal, setTypeModal, prop } = props;
  const [pageNum, setPageNum] = useState(0);
  const [pageNumEnd, setPageNumEnd] = useState(5);
  const [messageId, setMessageId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    GetMessage({ data: data, setMessage: setMessage });
  });

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
            message={message}
            pageNum={pageNum}
            pageNumEnd={pageNumEnd}
            setTypeModal={setTypeModal}
            setMessageId={setMessageId}
            messageId={messageId}
            typeModal={typeModal}
            data={data}
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
}

export default MessageShow;
