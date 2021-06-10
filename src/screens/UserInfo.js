import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Overlay,
  Tooltip,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { tokenData, udata } from "../Apollo";
import { PutUserInfo } from "../utils/ApiConfig";

function UserInfo(props) {
  const [newNickname, setNewNickname] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [prevPassword, setPrevPassword] = useState(null);

  const [error, seterror] = useState(false);

  const target = useRef(null);

  const onChangePrevPassword = (e) => {
    setPrevPassword(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const onChangeNewNickname = (e) => {
    setNewNickname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(newNickname);
    console.log(newPassword);
    PutUserInfo({
      nickname: newNickname,
      password: newPassword,
      seterror: seterror,
    });
  };

  return (
    <Container fluid>
      <Row style={{ marginTop: "2rem" }}>
        <Col
          md={{ offset: 2, span: 8 }}
          style={{ borderBottom: "1px solid gray" }}
        >
          <h1>마이 페이지</h1>
        </Col>
      </Row>
      <Row style={{ marginTop: "2rem" }}>
        <Col md={{ offset: 2, span: 8 }}>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formPlaintextEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={udata() && udata().email}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>이름</Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={udata() && udata().username}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>닉네임</Form.Label>
                <Form.Control
                  placeholder={`현재 닉네임 : ${udata() && udata().nickname}`}
                  onChange={onChangeNewNickname}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>현재 비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="현재 비밀번호"
                  onChange={onChangePrevPassword}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>변경 비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="변경할 비밀번호"
                  onChange={onChangeNewPassword}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label
                  className="my-1 mr-2"
                  htmlFor="inlineFormCustomSelectPref"
                >
                  학교
                </Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={`${udata().schoolname}`}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label
                  className="my-1 mr-2"
                  htmlFor="inlineFormCustomSelectPref"
                >
                  학년
                </Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={`${udata().grade}`}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label
                  className="my-1 mr-2"
                  htmlFor="inlineFormCustomSelectPref"
                >
                  반
                </Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={`${udata().classnum}`}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row as={Col}>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
                ref={target}
              >
                Submit
              </Button>
              <Overlay target={target.current} show={error} placement="right">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    정보 수정 실패!<br></br>
                    <strong>비밀번호</strong> 또는 <strong>닉네임</strong>를
                    <br />
                    확인해주세요.
                  </Tooltip>
                )}
              </Overlay>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserInfo;
