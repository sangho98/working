import React, { useState, useEffect } from "react";
import { Table, Tabs, Tab } from "react-bootstrap";
import { tokenData } from "../Apollo";
import { GetMessage, GetSendMessage } from "../utils/ApiConfig";

const ListMessage = (props) => {
  const {
    message,
    pageNum,
    pageNumEnd,
    settypemodal,
    setMessageId,
    sendmessage,
  } = props;

  return (
    <Tabs defaultActiveKey="list" transition={false} id="noanim-tab-example">
      <Tab eventKey="list" title="받은 쪽지함">
        <Table bordered hover>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>보낸 사람</th>
              <th style={{ width: "85%", textAlign: "center" }}>제목</th>
            </tr>
          </thead>
          <tbody>
            {message.data.slice(pageNum, pageNumEnd).map((m) => {
              return (
                <tr key={m.id}>
                  <td style={{ textAlign: "center" }}>{m.fromUserName}</td>

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
      </Tab>
      <Tab eventKey="follower" title="보낸 쪽지함">
        <Table bordered hover>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>받는 사람</th>
              <th style={{ width: "85%", textAlign: "center" }}>제목</th>
            </tr>
          </thead>
          <tbody>
            {sendmessage ? (
              sendmessage.data.slice(pageNum, pageNumEnd).map((m) => {
                return (
                  <tr key={m.id}>
                    <td style={{ textAlign: "center" }}>{m.toUserName}</td>

                    <td style={{ textAlign: "center" }}>{m.content}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td></td>
                <td>메시지가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Tab>
    </Tabs>
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
                <th style={{ textAlign: "center" }}>보낸 사람</th>
                <th style={{ width: "85%", textAlign: "center" }}>내용</th>
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
                <td style={{ textAlign: "center" }}>{m.fromUserName}</td>
                <td style={{ width: "85%", textAlign: "center" }}>
                  {m.content}
                </td>
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
  const [snullm, setsnullm] = useState(false);
  const [message, setmessage] = useState(null);
  const [sendmessage, setsendmessage] = useState(null);

  useEffect(() => {
    if (!message) GetMessage({ setmessage: setmessage, setnullm: setnullm });
    if (!sendmessage)
      GetSendMessage({ setsendmessage: setsendmessage, setsnullm: setsnullm });
  }, [message, sendmessage]);

  console.log(sendmessage);
  console.log(message);
  if (nullm) {
    console.log("here");
    return (
      <Tabs defaultActiveKey="list" transition={false} id="noanim-tab-example">
        <Tab eventKey="list" title="받은 쪽지함">
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
        </Tab>
        <Tab eventKey="follower" title="보낸 쪽지함">
          {sendmessage ? (
            <Table bordered hover>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>받는 사람</th>
                  <th style={{ width: "85%", textAlign: "center" }}>제목</th>
                </tr>
              </thead>
              <tbody>
                {sendmessage.data.slice(pageNum, pageNumEnd).map((m) => {
                  return (
                    <tr key={m.id}>
                      <td style={{ textAlign: "center" }}>{m.toUserName}</td>

                      <td style={{ textAlign: "center" }}>{m.content}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <Table>
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr>
                  <td>메시지가 없습니다.</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Tab>
      </Tabs>
    );
  }

  if (message) {
    if (typemodal === "1") {
      return (
        <ListMessage
          message={message}
          pageNum={pageNum}
          pageNumEnd={pageNumEnd}
          settypemodal={settypemodal}
          setMessageId={setMessageId}
          sendmessage={sendmessage}
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
