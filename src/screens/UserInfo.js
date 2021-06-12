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
import styled from "styled-components";
import { tokenData, udata } from "../Apollo";
import { PutUserInfo } from "../utils/ApiConfig";
const UserInfoWrapper = styled.div`
  min-height: 100vh;
`;
const UserInfoInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;
const UserInfoForm = styled(Form)`
  max-width: 700px;
  height: 500px;
  margin: 0 auto;
  padding: 30px 0;
`;
const UserInfoFormLable = styled(Form.Label)`
  font-weight: 700;
`;
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
    <UserInfoWrapper>
      <UserInfoInner>
        <UserInfoForm>
          <Form.Group as={Col} controlId="formPlaintextEmail">
            <UserInfoFormLable>Email</UserInfoFormLable>
            <p>{udata() && udata().email}</p>
          </Form.Group>
          <Form.Group as={Col}>
            <UserInfoFormLable>이름</UserInfoFormLable>
            <p>{udata() && udata().username}</p>
          </Form.Group>
          <Form.Group as={Col}>
            <UserInfoFormLable>현재 닉네임</UserInfoFormLable>
            <Form.Control
              placeholder={`현재 닉네임 : ${udata() && udata().nickname}`}
              onChange={onChangeNewNickname}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <UserInfoFormLable>현재 비밀번호</UserInfoFormLable>
            <Form.Control
              type="password"
              placeholder="현재 비밀번호"
              onChange={onChangePrevPassword}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <UserInfoFormLable>변경 비밀번호</UserInfoFormLable>
            <Form.Control
              type="password"
              placeholder="변경할 비밀번호"
              onChange={onChangeNewPassword}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <UserInfoFormLable
              className="my-1 mr-2"
              htmlFor="inlineFormCustomSelectPref"
            >
              학교
            </UserInfoFormLable>
            <p>{udata().schoolname}</p>
          </Form.Group>
          <Form.Group as={Col}>
            <UserInfoFormLable
              className="my-1 mr-2"
              htmlFor="inlineFormCustomSelectPref"
            >
              학년
            </UserInfoFormLable>
            <p>{udata().grade}</p>
          </Form.Group>
          <Form.Group as={Col}>
            <UserInfoFormLable
              className="my-1 mr-2"
              htmlFor="inlineFormCustomSelectPref"
            >
              반
            </UserInfoFormLable>
            <p>{udata().classnum}</p>
          </Form.Group>

          <Button
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
            ref={target}
            style={{
              width: "100%",
              backgroundColor: "#03c7f5",
              border: "none",
            }}
          >
            회원정보 변경
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
        </UserInfoForm>
      </UserInfoInner>
    </UserInfoWrapper>
  );
}

export default UserInfo;
