import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { GetTimeList } from "../utils/ApiConfig";
const Wrapper = styled.div`
  margin-bottom: 20px;
`;
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
  return day ? (
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
  ) : null;
};
function UserSchedule({ nickname }) {
  const [schedule, setschedule] = useState();

  const [week, setWeek] = useState([]);
  useEffect(() => {
    if (!schedule || !schedule.data || !schedule.data.hisTimetable) {
      GetTimeList({ setschedule: setschedule });
    } else {
      if (schedule.data.hisTimetable) {
        let tempMon = [];
        let tempTues = [];
        let tempWen = [];
        let tempThur = [];
        let tempFri = [];
        const rowData = schedule.data.hisTimetable[1].row.slice(0, 7);
        rowData.map((m, i) => {
          tempMon = [
            ...tempMon,
            schedule.data.hisTimetable[1].row[i].ITRT_CNTNT,
          ];
          tempTues = [
            ...tempTues,
            schedule.data.hisTimetable[1].row[i + 6].ITRT_CNTNT,
          ];
          tempWen = [
            ...tempWen,
            schedule.data.hisTimetable[1].row[i + 12].ITRT_CNTNT,
          ];
          tempThur = [
            ...tempThur,
            schedule.data.hisTimetable[1].row[i + 18].ITRT_CNTNT,
          ];
          tempFri = [
            ...tempFri,
            schedule.data.hisTimetable[1].row[i + 24].ITRT_CNTNT,
          ];
        });
        setWeek([tempMon, tempTues, tempWen, tempThur, tempFri]);
      }
    }
  }, [schedule]);

  return week ? (
    <Wrapper>
      <div style={{ marginBottom: "20px" }}>
        <span style={{ fontSize: "20px", fontWeight: "700" }}>{nickname}</span>
        님의 시간표는? 💼
      </div>
      <ScheduleSection>
        <CardItem dayOfWeek={"월"} day={week[0]}></CardItem>
        <CardItem dayOfWeek={"화"} day={week[1]}></CardItem>
        <CardItem dayOfWeek={"수"} day={week[2]}></CardItem>
        <CardItem dayOfWeek={"목"} day={week[3]}></CardItem>
        <CardItem dayOfWeek={"금"} day={week[4]}></CardItem>
      </ScheduleSection>
    </Wrapper>
  ) : (
    <div>시간표를 가져오고 있습니다.</div>
  );
}

export default UserSchedule;
