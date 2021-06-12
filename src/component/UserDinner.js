import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { GetTimeList } from "../utils/ApiConfig";
const Wrapper = styled.div``;
const ScheduleSection = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CardItemWrapper = styled.div`
  width: 200px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;
const DayOfWeek = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;
const Subject = styled.div`
  padding: 3px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardItem = ({ dayOfWeek, day }) => {
  return (
    <CardItemWrapper>
      <DayOfWeek>{dayOfWeek}</DayOfWeek>
      <Subject>{day[0]}</Subject>
      <Subject>{day[1]}</Subject>
      <Subject>{day[2]}</Subject>
      <Subject>{day[3]}</Subject>
      <Subject>{day[4]}</Subject>
      <Subject>{day[5]}</Subject>
      <Subject>{day[6]}</Subject>
    </CardItemWrapper>
  );
};
function UserDinner({ nickname }) {
  const [schedule, setschedule] = useState();

  let schedulemap = new Map();
  let d = 0;

  useEffect(() => {
    if (!schedule) {
      GetTimeList({ setschedule: setschedule });
    }
    if (schedule) {
    }
  }, [schedule]);

  if (schedule) {
    let monthDay = [];
    let tuesDay = [];
    let wenDay = [];
    let thurDay = [];
    let friDay = [];
    const rowData = schedule.data.hisTimetable[1].row.slice(0, 7);
    rowData.map((m, i) => {
      monthDay = [...monthDay, schedule.data.hisTimetable[1].row[i].ITRT_CNTNT];
      tuesDay = [
        ...tuesDay,
        schedule.data.hisTimetable[1].row[i + 6].ITRT_CNTNT,
      ];
      wenDay = [
        ...wenDay,
        schedule.data.hisTimetable[1].row[i + 12].ITRT_CNTNT,
      ];
      thurDay = [
        ...thurDay,
        schedule.data.hisTimetable[1].row[i + 18].ITRT_CNTNT,
      ];
      friDay = [
        ...friDay,
        schedule.data.hisTimetable[1].row[i + 24].ITRT_CNTNT,
      ];
    });
    return (
      <Wrapper>
        <div style={{ marginBottom: "20px" }}>
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            {nickname}
          </span>
          님의 식단표는?
        </div>
        <ScheduleSection>
          <CardItem dayOfWeek={"월"} day={monthDay}></CardItem>
          <CardItem dayOfWeek={"화"} day={tuesDay}></CardItem>
          <CardItem dayOfWeek={"수"} day={wenDay}></CardItem>
          <CardItem dayOfWeek={"목"} day={thurDay}></CardItem>
          <CardItem dayOfWeek={"금"} day={friDay}></CardItem>
        </ScheduleSection>
      </Wrapper>
    );
  } else {
    return <div>시간표 불러오는중..</div>;
  }
}

export default UserDinner;
