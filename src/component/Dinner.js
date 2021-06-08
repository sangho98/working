import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { tokenData } from "../Apollo";
import { GetDinnerList } from "../utils/ApiConfig";

function Dinner(props) {
  const [dinnerList, setDinnerList] = useState(null);

  useEffect(() => {
    GetDinnerList({ data: tokenData(), setDinnerList: setDinnerList });
  }, []);

  console.log(dinnerList);
  return (
    <Table>
      <thead>
        <tr>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
          <th>일</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </Table>
  );
}

export default Dinner;
