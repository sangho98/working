import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { GetDinnerList } from "../utils/ApiConfig";
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
function Dinner(props) {
  const [dinnerlist, setdinnerlist] = useState(null);

  if (dinnerlist) {
    return <div>hi</div>;
  } else {
    return <div>급식표 로딩중..</div>;
  }
}

export default Dinner;
