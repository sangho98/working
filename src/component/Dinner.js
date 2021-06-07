import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { tokenData } from "../Apollo";
import { GetDinnerList } from "../utils/ApiConfig";

function Dinner(props) {
  const [dinnerList, setDinnerList] = useState(null);

  useEffect(() => {
    GetDinnerList({ data: tokenData(), setDinnerList: setDinnerList });
  }, []);

  console.log(dinnerList);
  return dinnerList ? <div> ok </div> : <div>no friend</div>;
}

export default Dinner;
