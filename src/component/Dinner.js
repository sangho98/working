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
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>hi</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Dinner;
