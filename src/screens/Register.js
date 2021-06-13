import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Tooltip,
  Overlay,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import {
  GetSchoolInfo,
  PostCheckEmail,
  PostCheckNickname,
  PostRegister,
} from "../utils/ApiConfig";
import { Link } from "react-router-dom";

function Register(props) {
  const [emailFull, setEmailFull] = useState(null);

  const [password, setPassword] = useState(null);

  const [username, setUsername] = useState(null);
  const [nickname, setNickname] = useState(null);

  const [educationcenter, seteducationcenter] = useState(null);
  const [schoolname, setschoolname] = useState(null);
  const [grade, setgrade] = useState(null);
  const [classnum, setclassnum] = useState(null);
  const [schoolcode, setschoolcode] = useState(null);
  const [resResult, setResResult] = useState(false);
  const [reg, setreg] = useState(true);
  const [duplicateNick, setDuplicateNick] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState(false);

  const target = useRef(null);
  const target2 = useRef(null);
  const target3 = useRef(null);
  const target4 = useRef(null);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmailFull(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeEducationCenter = (e) => {
    seteducationcenter(e.target.value);
  };
  const onChangeSchoolname = (e) => {
    setschoolname(e.target.value);
  };
  const onChangeClassNum = (e) => {
    setclassnum(e.target.value);
  };
  const onChangeGrade = (e) => {
    switch (e.target.value) {
      case "1학년":
        setgrade("1");
      case "2학년":
        setgrade("2");
      case "3학년":
        setgrade("3");
    }
  };

  return (
    <Container
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
      fluid
    >
      <Row style={{ marginTop: "3rem" }} className="justify-content-md-center">
        <Col md="auto">
          <Link to="/">
            <h1
              style={{
                marginBottom: "3rem",
                color: "#03c7f5",
              }}
            >
              HighSchool Time
            </h1>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Form style={{ width: "33%" }}>
          <Form.Row>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="이름"
                onChange={onChangeUsername}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="닉네임"
                onChange={onChangeNickname}
              />
            </Col>
            <Col>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "#03c7f5",
                  border: "none",
                }}
                onClick={() => {
                  PostCheckNickname({
                    nickname: nickname,
                    setDuplicateNick: setDuplicateNick,
                  });
                }}
                ref={target}
              >
                닉네임 확인
              </Button>
              <Overlay
                target={target.current}
                show={duplicateNick}
                placement="right"
              >
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    닉네임 오류!<br></br>
                    <strong>닉네임</strong> 이 중복됩니다.
                  </Tooltip>
                )}
              </Overlay>
            </Col>
          </Form.Row>
          <Form.Row style={{ marginTop: "0.5rem" }}>
            <Col>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="example@naver.com"
                onChange={onChangeEmail}
              />
            </Col>

            <Col md={3}>
              <Button
                type="button"
                className="mb-2"
                style={{
                  width: "100%",
                  backgroundColor: "#03c7f5",
                  border: "none",
                }}
                onClick={() => {
                  console.log(`send Email: ${emailFull}`);
                  PostCheckEmail({
                    email: emailFull,
                    setDuplicateEmail: setDuplicateEmail,
                  });
                }}
                ref={target2}
              >
                이메일 확인
              </Button>
              <Overlay
                target={target2.current}
                show={duplicateEmail}
                placement="right"
              >
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    이메일 오류!<br></br>
                    <strong>이메일</strong> 이 중복됩니다.
                  </Tooltip>
                )}
              </Overlay>
            </Col>
          </Form.Row>
          <Form.Row style={{ marginTop: "0.0rem" }}>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={onChangePassword}
              />
            </Col>
          </Form.Row>
          <Form.Row style={{ marginTop: "0.5rem" }}>
            <Col>
              <Form.Control as="select" defaultValue="Choose...">
                <option>지역 보기</option>
                <option>서울특별시</option>
                <option>부산광역시</option>
                <option>대구광역시</option>
                <option>인천광역시</option>
                <option>광주광역시</option>
                <option>대전광역시</option>
                <option>울산광역시</option>
                <option>세종특별자치시</option>
                <option>경기도</option>
                <option>강원도</option>
                <option>충청북도</option>
                <option>충청남도</option>
                <option>전라북도</option>
                <option>전라남도</option>
                <option>경상북도</option>
                <option>경상남도</option>
                <option>제주특별자치도</option>
              </Form.Control>
            </Col>
          </Form.Row>
          <Form.Row style={{ marginTop: "0.5rem" }}>
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Ex. 전라북도"
                onChange={onChangeEducationCenter}
              />
            </Col>
            <Col md={4}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "#03c7f5",
                  border: "none",
                }}
                onClick={() => {
                  GetSchoolInfo({
                    setreg: setreg,
                    schoolname: schoolname,
                    educationcenter: educationcenter,
                  });
                }}
                ref={target4}
              >
                지역 인증
              </Button>
              <Overlay target={target.current} show={!reg} placement="right">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    지역 오류!<br></br>
                    <strong>지역</strong>이 올바르지않습니다.
                  </Tooltip>
                )}
              </Overlay>
            </Col>
          </Form.Row>
          <Form.Row style={{ marginTop: "0.3rem" }}>
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="ㅇㅇ고등학교"
                onChange={onChangeSchoolname}
              />
            </Col>
            <Col md={4}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "#03c7f5",
                  border: "none",
                }}
                onClick={() => {
                  GetSchoolInfo({
                    setreg: setreg,
                    schoolname: schoolname,
                    educationcenter: educationcenter,
                    setschoolcode: setschoolcode,
                  });
                }}
                ref={target3}
              >
                학교 인증
              </Button>
              <Overlay target={target.current} show={!reg} placement="right">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    학교 오류!<br></br>
                    <strong>학교</strong>이(가) 올바르지않습니다.
                  </Tooltip>
                )}
              </Overlay>
            </Col>
          </Form.Row>
          <Form.Row style={{ marginTop: "0.5rem" }}>
            <Col md={9}>
              <Form.Label>학년</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={onChangeGrade}
              >
                <option>학년 선택</option>
                <option>1학년</option>
                <option>2학년</option>
                <option>3학년</option>
              </Form.Control>
            </Col>
            <Col md={3}>
              <Form.Label>반 입력 (숫자만)</Form.Label>
              <Form.Control type="text" onChange={onChangeClassNum} />
            </Col>
          </Form.Row>
          <Form.Row style={{ marginTop: "0.7rem" }}>
            <Col>
              <Button
                type="button"
                style={{
                  width: "100%",
                  backgroundColor: "#03c7f5",
                  border: "none",
                }}
                onClick={() => {
                  props.history.goBack();
                }}
              >
                이전 단계
              </Button>
            </Col>
          </Form.Row>

          <Form.Row style={{ marginTop: "0.3rem" }}>
            <Col>
              <Button
                type="button"
                style={{
                  width: "100%",
                  marginTop: "0.3rem",
                  backgroundColor: "#03c7f5",
                  border: "none",
                }}
                onClick={() => {
                  if (duplicateNick || duplicateEmail) {
                    // 회원가입 막기
                    return;
                  }

                  if (
                    emailFull === null ||
                    password === null ||
                    username === null ||
                    educationcenter === null ||
                    grade === null ||
                    grade === "학년 선택" ||
                    classnum === null ||
                    schoolname === null
                  ) {
                    console.log("No Input");
                    return;
                  }
                  const regData = {
                    email: emailFull,
                    password: password,
                    username: username,
                    nickname: nickname,
                    educationcenter: educationcenter,
                    schoolname: schoolname,
                    grade: grade,
                    classnum: classnum,
                    schoolcode: schoolcode,
                  };

                  PostRegister({ data: regData, setResResult: setResResult });

                  props.history.push("/login");
                }}
              >
                회원가입
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Row>
    </Container>
  );
}

export default Register;
