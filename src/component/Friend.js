import React, { useEffect, useState } from "react";
import { Tabs, Tab, NavItem, Nav } from "react-bootstrap";
import { tokenData } from "../Apollo";
import { GetFriendFollowList, GetFriendList } from "../utils/ApiConfig";
import axios from "axios";
import { SERVER_URL } from "../utils/URL";
import { Link } from "react-router-dom";
import "../Stylefolder/Friend.css";
class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      friends: [],
    };
    // <Link to = `dwqjqfqf${page}'
  }
  Loadplz = async () => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .get(SERVER_URL + "/user/followers")
      .then(({ data }) => {
        console.log(data);
        this.setState({
          boards: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
  Loadfriend = async () => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .get(SERVER_URL + "/user/friends")
      .then(({ data }) => {
        console.log(data);
        this.setState({
          friends: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
  Acceptfriend = async ({ id }) => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .get(SERVER_URL + `/user/${id}/accept`)
      .then(({ data }) => {
        alert("수락완료");
        console.log(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  Refusefriend = async ({ id }) => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .delete(SERVER_URL + `/user/${id}`)
      .then(({ data }) => {
        console.log(data);
        alert("거절완료");
      })
      .catch((e) => {
        console.error(e);
      });
  };
  componentDidMount() {
    this.Loadfriend();
    this.Loadplz();
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <thead></thead>
        <tbody>
          <tr className="friendlist">
            {this.state.friends.map((friend) => (
              <tr key={friend.friendId} id="content_content">
                <td>{friend.friendName}</td>
                <Link to={`/post/freeboard/letter/${friend.friendId}`}>
                  <button on>쪽지보내기</button>
                </Link>
                <button
                  onClick={() => {
                    this.Refusefriend({ id: friend.friendId });
                  }}
                >
                  친구삭제
                </button>
              </tr>
            ))}
          </tr>
          <div className="bank">
            <h4>친구 요청</h4>
          </div>
          <tr className="friendplz">
            {this.state.boards.map((board) => (
              <tr key={board.friendId} id="content_content">
                <span>{board.friendName}</span>
                <button
                  onClick={() => {
                    this.Acceptfriend({ id: board.friendId });
                  }}
                >
                  수락
                </button>
                <button
                  onClick={() => {
                    this.Refusefriend({ id: board.friendId });
                  }}
                >
                  거절
                </button>
              </tr>
            ))}
          </tr>
        </tbody>
      </div>
    );
  }
}

export default Friend;
/*function Friend(props) {
  const [friendList, setFriendList] = useState(null);
  const [followlist, setfollowlist] = useState(new Map());

  useEffect(() => {
    if (!friendList || !followlist) {
      GetFriendList({ setFriendList: setFriendList });
      GetFriendFollowList({ setfollowlist: setfollowlist });
    }
  }, [friendList, followlist]);

  console.log(`Get :${followlist.get("1")} `);
  return (
    <Tabs defaultActiveKey="list" transition={false} id="noanim-tab-example">
      <Tab eventKey="list" title="친구 목록">
        {friendList ? <div> ok </div> : <div>no friend</div>}
      </Tab>
      <Tab eventKey="follower" title="친구 요청 목록">
        {followlist ? <div>{followlist}</div> : <div>No </div>}
      </Tab>
    </Tabs>
  );
}*/
