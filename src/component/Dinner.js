import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { GetDinnerList } from "../utils/ApiConfig";

function Dinner(props) {
  const [dinnerlist, setdinnerlist] = useState(null);

  useEffect(() => {
    if (!dinnerlist) GetDinnerList({ setdinnerlist: setdinnerlist });
  }, [dinnerlist]);

  console.log(dinnerlist);

  if (dinnerlist) {
    let i = -1;
    return (
      <Table responsive>
        <thead>
          <tr>
            <th></th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
          </tr>
        </thead>
        <tbody>
          {dinnerlist.data.mealServiceDietInfo[1].row.slice(0, 3).map((m) => {
            if (i !== -1) {
              i = i + 5;
            } else if (i === -1) {
              i = 0;
            }

            return (
              <tr>
                <th>
                  {dinnerlist.data.mealServiceDietInfo[1].row[i].MMEAL_SC_NM}
                </th>
                <td>
                  {dinnerlist.data.mealServiceDietInfo[1].row[i].DDISH_NM.split(
                    "<br/>"
                  )}
                </td>
                <td>
                  {dinnerlist.data.mealServiceDietInfo[1].row[
                    i + 1
                  ].DDISH_NM.split("<br/>")}
                </td>
                <td>
                  {dinnerlist.data.mealServiceDietInfo[1].row[
                    i + 2
                  ].DDISH_NM.split("<br/>")}
                </td>
                <td>
                  {dinnerlist.data.mealServiceDietInfo[1].row[
                    i + 3
                  ].DDISH_NM.split("<br/>")}
                </td>
                <td>
                  {dinnerlist.data.mealServiceDietInfo[1].row[
                    i + 4
                  ].DDISH_NM.split("<br/>")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  } else {
    return <div>급식표 로딩중..</div>;
  }
}

export default Dinner;
