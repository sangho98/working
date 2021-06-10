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
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link
                eventKey="hotboard"
                active={show === "hotboard"}
                onMouseEnter={() => setShow("hotboard")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                HOT 게시판
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                eventKey="freeboard"
                active={show === "freeboard"}
                onMouseEnter={() => setShow("freeboard")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                자유 게시판
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="infoboard"
                active={show === "infoboard"}
                onMouseEnter={() => setShow("infoboard")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                정보 게시판
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="matchingboard"
                active={show === "matchingboard"}
                onMouseEnter={() => setShow("matchingboard")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                매칭 게시판
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="advertiseboard"
                active={show === "advertiseboard"}
                onMouseEnter={() => setShow("advertiseboard")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                홍보 게시판
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={7}>
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
        </Col>
        <Col sm={3}>
          <Alert variant="dark">
            <Alert.Heading>업데이트 중..</Alert.Heading>
            <p>2021-06-11 메인페이지 작업 완료</p>
            <hr />
            <p className="mb-0">추가 기능 구현중..</p>
          </Alert>
        </Col>
      </Row>
    </Tab.Container>
  );
};

const ControlledUserInfo = (props) => {
  const { userData, prop } = props;
  console.log(udata());
  console.log("Heelo");
  return (
    <Container>
      <Card style={{ width: "100%" }} className="text-center">
        <Image
          variant="top"
          src="./user-solid.svg"
          style={{ maxWidth: "13rem", padding: "15px" }}
          roundedCircle
          className="mx-auto"
        />

        <Card.Body>
          <Card.Title>{udata() ? udata().nickname : "Null"}</Card.Title>
          <Card.Text>{udata() ? udata().username : "Null"}</Card.Text>
          <Link to="/user">
            <Button style={{ margin: "10px" }}>내 정보</Button>
          </Link>

          <Button
            onClick={() => {
              localStorage.removeItem("TOKEN");
              tokenData(null);
              udata(null);
              prop.history.push("/");
            }}
          >
            로그아웃
          </Button>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            학교 : {udata() ? udata().schoolname : "Null"}
          </ListGroupItem>
          <ListGroupItem>
            {udata() ? udata().grade : "Null"}학년{" "}
            {udata() ? udata().classnum : "Null"}반
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Container>
  );
};

function Main(props) {
  const [article, setArticle] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (!tokenData()) props.history.push("/login");
  });
  useEffect(() => {
    GetUserInfo({ setloading: setloading });
  }, [loading]);

  console.log("render");
  return (
    <Container fluid>
      <Row style={{ marginTop: "2rem" }}>
        <Col md={{ offset: 0, span: 9 }}>
          <Jumbotron>
            <h1>HighSchool Time 공사중..</h1>
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
      </Row>

      <Row style={{ marginTop: "1.5rem" }}>
        <Container style={{ height: "300px" }} fluid>
          <ControlledTabs props={props} article={article} />
        </Container>
      </Row>
    </Container>
  );
}

export default Main;
