import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { tokenData } from "../Apollo";
import { GetFriendFollowList, GetFriendList } from "../utils/ApiConfig";

function Friend(props) {
  const [friendList, setFriendList] = useState(null);
  const [friendFollowList, setFriendFollowList] = useState(null);

  useEffect(() => {
    if (!friendList || !friendFollowList) {
      GetFriendList({ setFriendList: setFriendList });
      GetFriendFollowList({ setFriendFollowList: setFriendFollowList });
    }
  }, [friendList, friendFollowList]);

  return (
    <Tabs defaultActiveKey="list" transition={false} id="noanim-tab-example">
      <Tab eventKey="list" title="친구 목록">
        {friendList ? <div> ok </div> : <div>no friend</div>}
      </Tab>
      <Tab eventKey="follower" title="친구 요청 목록">
        {friendFollowList ? <div>OK FOLLOW</div> : <div>No </div>}
      </Tab>
    </Tabs>
  );
}

export default Friend;
