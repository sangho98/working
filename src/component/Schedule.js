import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { udata } from "../Apollo";
import { GetTimeList, GetUserInfo } from "../utils/ApiConfig";

const test = ({ schedule }) => {
  schedule.data.hisTimetable[1].row.map((m) => {
    return (
      <tr>
        <td>{m.PERIO}</td>
        <td>{m.ITRT_CNTNT}</td>
      </tr>
    );
  });
};
function Schedule(props) {
  const [schedule, setschedule] = useState();

  let schedulemap = new Map();
  let d = 0;

  useEffect(() => {
    if (!schedule) GetTimeList({ setschedule: setschedule });
  }, [schedule]);

  console.log(schedule);

  if (schedule) {
    let i = -1;

    return (
      <Table>
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
          {schedule.data.hisTimetable[1].row.slice(0, 7).map((m) => {
            console.log(i++);
            return (
              <tr>
                <th>{schedule.data.hisTimetable[1].row[i].PERIO}</th>
                <td>{schedule.data.hisTimetable[1].row[i].ITRT_CNTNT}</td>
                <td>{schedule.data.hisTimetable[1].row[i + 6].ITRT_CNTNT}</td>
                <td>{schedule.data.hisTimetable[1].row[i + 12].ITRT_CNTNT}</td>
                <td>{schedule.data.hisTimetable[1].row[i + 18].ITRT_CNTNT}</td>
                <td>{schedule.data.hisTimetable[1].row[i + 24].ITRT_CNTNT}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  } else {
    return <div>Server Error!!</div>;
  }
}

export default Schedule;
