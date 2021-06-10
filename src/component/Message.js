import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { tokenData } from "../Apollo";
import { GetMessage } from "../utils/ApiConfig";

const ListMessage = (props) => {
  const { message, pageNum, pageNumEnd, settypemodal, setMessageId } = props;

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th style={{ textAlign: "center" }}>번호</th>
          <th style={{ width: "93%", textAlign: "center" }}>제목</th>
        </tr>
      </thead>
      <tbody>
        {message.data.slice(pageNum, pageNumEnd).map((m) => {
          return (
            <tr key={m.id}>
              <td style={{ textAlign: "center" }}>{m.id}</td>

              <td
                style={{ textAlign: "center" }}
                onClick={() => {
                  settypemodal("2");
                  setMessageId(m.id);
                }}
              >
                {m.content}
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
        {message.data.map((m) => {
          if (m.id === messageId) {
            return (
              <tr key={m.id}>
                <th style={{ textAlign: "center" }}>내용</th>
              </tr>
            );
          }
        })}
      </thead>
      <tbody>
        {message.data.map((m) => {
          if (m.id === messageId) {
            return (
              <tr key={m.id}>
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
    typemodal,
    pageNum,
    pageNumEnd,
    settypemodal,
    setMessageId,
    messageId,
  } = props;
  const [nullm, setnullm] = useState(false);

  const [message, setmessage] = useState(null);

  useEffect(() => {
    if (!message) GetMessage({ setmessage: setmessage, setnullm: setnullm });
  }, [message]);

  if (nullm) {
    return (
      <Table bordered hover>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr>
            <td>메시지가 없습니다.</td>
          </tr>
        </tbody>
      </Table>
    );
  }
  console.log(message);

  if (message) {
    if (typemodal === "1") {
      return (
        <ListMessage
          message={message}
          pageNum={pageNum}
          pageNumEnd={pageNumEnd}
          settypemodal={settypemodal}
          setMessageId={setMessageId}
        />
      );
    } else if (typemodal === "2") {
      return <MessageDetail message={message} messageId={messageId} />;
    }
  } else {
    return <div>Back-Server Error!!</div>;
  }
}

export default Message;
