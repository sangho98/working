import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { udata } from "../Apollo";
import { GetTimeList, GetUserInfo } from "../utils/ApiConfig";

function Schedule(props) {
  const [schedule, setschedule] = useState();

  let schedulemap = new Map();
  let d = 0;

  useEffect(() => {
    if (!schedule) {
      GetTimeList({ setschedule: setschedule });
    }
  }, [schedule]);

  if (schedule) {
    console.log(schedule);
    return (
      <Table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th></th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
          </tr>
        </thead>
        <tbody>
          {schedule.data.hisTimetable[1].row.slice(0, 7).map((m, i) => {
            return (
              <tr key={i} style={{ textAlign: "center" }}>
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
    return <div>시간표 불러오는중..</div>;
  }
}

export default Schedule;
