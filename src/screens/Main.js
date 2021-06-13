import React, { useEffect, useState } from "react";

import {
  Tab,
  Row,
  Col,
  Nav,
  Card,
  ListGroup,
  ListGroupItem,
  Container,
  Button,
  Image,
  Jumbotron,
  Table,
  Alert,
  Spinner,
} from "react-bootstrap";

import { GetArticle, GetUserInfo } from "../utils/ApiConfig";
import { Link } from "react-router-dom";
import { tokenData, udata } from "../Apollo";
import styled from "styled-components";
import UserSchedule from "../component/UserSchedule";
import UserDinner from "../component/UserDinner";

const ListArticle = (props) => {
  const { data } = props;

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th style={{ width: "100%", textAlign: "center" }}>제목</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.slice(0, 5).map((a) => {
            return (
              <tr key={a.id}>
                <td style={{ textAlign: "center" }}>{a.title}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};
const NavWrapper = styled(Nav)`
  width: 200px;
  height: 300px;
  border: 1px solid #03c7f5;
  border-radius: 5px;
`;

const NavItem = styled(Nav.Item)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NavLink = styled(Nav.Link)`
  color: #03c7f5;
`;
const ControlledTabs = (props) => {
  const [show, setShow] = useState(null);
  const [article, setarticle] = useState(null);

  useEffect(() => {
    if (tokenData() && show) {
      GetArticle({ setarticle: setarticle, show: show });
    }
  }, [show]);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <NavWrapper className="flex-Column">
            <NavItem>
              <NavLink
                eventKey="hotboard"
                active={show === "hotboard"}
                onMouseEnter={() => setShow("hotboard")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                HOT 게시판
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                eventKey="freeboard"
                active={show === "freeboard"}
                onMouseEnter={() => setShow("freeboard")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                자유 게시판
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                eventKey="infoboard"
                active={show === "infoboard"}
                onMouseEnter={() => setShow("infoboard")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                정보 게시판
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                eventKey="matchingboard"
                active={show === "matchingboard"}
                onMouseEnter={() => setShow("matchingboard")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                매칭 게시판
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                eventKey="advertiseboard"
                active={show === "advertiseboard"}
                onMouseEnter={() => setShow("advertiseboard")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                홍보 게시판
              </NavLink>
            </NavItem>
          </NavWrapper>
        </Col>
        <Col sm={8}>
          {show ? (
            <Tab.Content>
              <Tab.Pane eventKey="hotboard" active={show === "hotboard"}>
                <ListArticle data={article} />
              </Tab.Pane>
              <Tab.Pane eventKey="freeboard" active={show === "freeboard"}>
                <ListArticle data={article} />
              </Tab.Pane>
              <Tab.Pane eventKey="infoboard" active={show === "infoboard"}>
                <ListArticle data={article} />
              </Tab.Pane>
              <Tab.Pane
                eventKey="matchingboard"
                active={show === "matchingboard"}
              >
                <ListArticle data={article} />
              </Tab.Pane>
              <Tab.Pane
                eventKey="advertiseboard"
                active={show === "advertiseboard"}
              >
                <ListArticle data={article} />
              </Tab.Pane>
            </Tab.Content>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
              }}
            >
              보고 싶은 게시판에 마우스를 올려주세요
            </div>
          )}
        </Col>
      </Row>
    </Tab.Container>
  );
};

const UserInfoWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 200px;
  padding: 10px;
  height: 300px;
  background-color: #f9f9f9;
  color: #737373;
`;
const UserAvatarSection = styled.div`
  display: flex;
`;
const UserInfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserNickName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 23px;
  color: black;
  font-weight: 700;
`;
const UserUserName = styled.div`
  display: flex;
  justify-content: center;
`;
const ButtonForm = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;
const UserSchoolText = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;
const UserClass = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;
const MyPageLink = styled(Link)`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  align-items: center;
  margin-right: 5px;
  border: 1px solid #d6d6d6;
  color: #737373;
  :hover {
    text-decoration: none;
    color: #737373;
  }
`;

const LogoutButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  align-items: center;
  margin-left: 5px;
  border: 1px solid #d6d6d6;
  color: #737373;
  cursor: pointer;
`;
const ControlledUserInfo = (props) => {
  const { userData, prop } = props;
  return (
    <UserInfoWrapper>
      <UserAvatarSection></UserAvatarSection>
      <UserInfoSection>
        <UserNickName>{udata() ? udata().nickname : "Null"}</UserNickName>
        <UserUserName>{udata() ? udata().username : "Null"}</UserUserName>
        <ButtonForm>
          <MyPageLink to="/user">내 정보</MyPageLink>
          <LogoutButton
            onClick={() => {
              localStorage.removeItem("TOKEN");
              tokenData(null);
              udata(null);
              prop.history.push("/");
            }}
          >
            로그아웃
          </LogoutButton>
        </ButtonForm>
        <UserSchoolText>{udata() ? udata().schoolname : "Null"}</UserSchoolText>
        <UserClass>
          <span>{udata() ? udata().grade : "Null"}학년 </span>
          <span>{udata() ? udata().classnum : "Null"}반</span>
        </UserClass>
      </UserInfoSection>
    </UserInfoWrapper>
  );
};
const Wrapper = styled.div``;
const MainInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding-top: 40px;
  min-height: 100vh;
`;
const ControllSection = styled.div`
  display: flex;

  margin-bottom: 20px;
`;

function Main(props) {
  const [article, setArticle] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (!tokenData()) props.history.push("/login");
  });
  useEffect(() => {
    GetUserInfo({ setloading: setloading });
  }, [loading]);

  return (
    <Wrapper>
      <MainInner>
        {/* <Row style={{ marginTop: "2rem" }}>
          <Col md={{ offset: 0, span: 9 }}>
            <Jumbotron>
              <h1>HighaSchool Time 공사중..</h1>
              <p>팀명 : 배추추</p>
              <p>팀원 : 배서현, 박상호, 황선형</p>
              <p>
                <Button
                  variant="primary"
                  onClick={() => {
                    window.alert("낚시~");
                  }}
                >
                  공지사항 확인
                </Button>
              </p>
            </Jumbotron>
          </Col>
          <Col>
            <ControlledUserInfo userData={udata()} prop={props} />
          </Col>
        </Row> */}
        <ControllSection>
          <ControlledTabs props={props} article={article} />
          <ControlledUserInfo userData={udata()} prop={props} />
        </ControllSection>
        {/* <Row style={{ marginTop: "1.5rem" }}>
          <Container style={{ height: "300px" }} fluid></Container>
        </Row> */}
        <UserSchedule
          nickname={udata() ? udata().nickname : "당신"}
        ></UserSchedule>
        <UserDinner nickname={udata() ? udata().nickname : "당신"}></UserDinner>
      </MainInner>
    </Wrapper>
  );
}

export default Main;
