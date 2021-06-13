import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { GetDinnerList, GetTimeList } from "../utils/ApiConfig";
const dinner = [
  [
    "통밀밥",
    "도토리묵무침",
    "배추김치",
    "마파두부",
    "단호박된장국",
    "수리취떡",
    "닭봉바베큐오븐구이",
  ],
  [
    "렌틸콩밥",
    "우동&새우튀김",
    "달걀장조림",
    "파래자반",
    "석박지",
    "토마토샐러드",
  ],
  [
    "발아현미밥",
    "건새우아욱된장국",
    "스파게티",
    "총각김치",
    "우리밀카스테라마늘",
    "러스크",
    "돈안심스테이크",
  ],
  [
    "차조밥",
    "두부김치찌개",
    "닭갈비",
    "멸치견과류볶음",
    "콩나물무침",
    "깍두기",
    "콤비네이션피자",
  ],
  [
    "낙지야채비빔밥",
    "쪽파달걀국",
    "모듬탕수&소스",
    "배추김치",
    "상하목장요구르트",
  ],
];
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

const CardItem = ({ dayOfWeek, dinner }) => {
  return (
    <CardItemWrapper>
      <DayOfWeek>{dayOfWeek}</DayOfWeek>
      {dinner.map((item) => {
        return <Subject>{item}</Subject>;
      })}
    </CardItemWrapper>
  );
};
function UserDinner({ nickname }) {
  return (
    <Wrapper>
      <div style={{ marginBottom: "20px" }}>
        <span style={{ fontSize: "20px", fontWeight: "700" }}>{nickname}</span>
        님의 식단표는? 🍚
      </div>
      <ScheduleSection>
        <CardItem dayOfWeek={"월"} dinner={dinner[0]}></CardItem>
        <CardItem dayOfWeek={"화"} dinner={dinner[1]}></CardItem>
        <CardItem dayOfWeek={"수"} dinner={dinner[2]}></CardItem>
        <CardItem dayOfWeek={"목"} dinner={dinner[3]}></CardItem>
        <CardItem dayOfWeek={"금"} dinner={dinner[4]}></CardItem>
      </ScheduleSection>
    </Wrapper>
  );
}

export default UserDinner;
