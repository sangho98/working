import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { tokenData } from "../Apollo";
import { GetMessage } from "../utils/ApiConfig";

const ListMessage = (props) => {
  const { message, pageNum, pageNumEnd, setTypeModal, setMessageId } = props;

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th style={{ textAlign: "center" }}>번호</th>
          <th style={{ width: "93%", textAlign: "center" }}>제목</th>
        </tr>
      </thead>
      <tbody>
        {message.slice(pageNum, pageNumEnd).map((m) => {
          return (
            <tr key={m.id}>
              <td style={{ textAlign: "center" }}>{m.id}</td>

              <td
                style={{ textAlign: "center" }}
                onClick={() => {
                  setTypeModal("2");
                  setMessageId(m.id);
                }}
              >
                {m.title}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const MessageDetail = (props) => {
  const { message, messageId } = props;
  return (
    <Table bordered hover>
      <thead>
        {message.map((m) => {
          if (m.id === messageId) {
            return (
              <tr>
                <th style={{ width: "10%", textAlign: "center" }}>제목</th>
                <td style={{ width: "90%", textAlign: "center" }}>{m.title}</td>
              </tr>
            );
          }
        })}
      </thead>
      <tbody>
        {message.map((m) => {
          if (m.id === messageId) {
            return (
              <tr key={m.id}>
                <th style={{ textAlign: "center" }}>내용</th>

                <td style={{ textAlign: "center" }}>{m.content}</td>
              </tr>
            );
          }
        })}
      </tbody>
    </Table>
  );
};

function Message(props) {
  const {
    typeModal,
    setTypeModal,
    pageNum,
    pageNumEnd,
    setMessageId,
    messageId,
  } = props;

  const [message, setMessage] = useState(null);

  useEffect(() => {
    GetMessage({ data: tokenData(), setMessage: setMessage });
  }, []);

  if (message) {
    if (typeModal === "1") {
      return (
        <ListMessage
          message={message}
          pageNum={pageNum}
          pageNumEnd={pageNumEnd}
          setTypeModal={setTypeModal}
          setMessageId={setMessageId}
        />
      );
    } else if (typeModal === "2") {
      return <MessageDetail message={message} messageId={messageId} />;
    }
  } else {
    return <div>Back-Server Error!!</div>;
  }
}

export default Message;
