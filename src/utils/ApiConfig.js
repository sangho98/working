import axios from "axios";
import { useState } from "react";
import { tokenData } from "../Apollo";
import { SEM, SERVER_URL } from "./URL";

export const client = axios.create({
  headers: {
    Authorization: localStorage.getItem("TOKEN"),
  },
});

export const clientset = (axios.defaults.headers.common["Authorization"] =
  localStorage.getItem("TOKEN"));

export const GetMessage = (props) => {
  const { setMessage } = props;
  axios
    .get(SERVER_URL + "/message/received", {
      headers: {
        Authorization: tokenData(),
      },
    })
    .then(
      (res) => {
        setMessage(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
};

export const SendMessage = (props) => {
  const { data, email } = props;
  axios
    .post(SERVER_URL + `/message/${email}`, data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetArticle = async (props) => {
  const { setArticle } = props;

  await axios
    .get(SERVER_URL + "/post/freeboard", {
      headers: {
        Authorization: tokenData(),
      },
    })
    .then((res) => {
      setArticle(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log("hi");
      console.log(err);
    });
};

export const GetUserInfo = async (props) => {
  const { setUserData } = props;

  await axios
    .get(SERVER_URL + "/user", {
      headers: {
        Authorization: tokenData(),
      },
    })
    .then((res) => {
      setUserData(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const PutUserInfo = (props) => {
  const { nickname, password } = props;

  const formData = new FormData();
  formData.append("nickname", nickname);
  formData.append("password", password);

  console.log(formData);

  axios
    .put(SERVER_URL + "/user", formData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const PostWriteArticle = (props) => {
  const { articleData } = props;

  axios.post(SERVER_URL + "/post/nexon", articleData).then(
    ((res) => {
      //success
    },
    (err) => {
      //faile
    })
  );
};

export const PostCheckEmail = (props) => {
  const { email, setDuplicateEmail } = props;

  const form = new FormData();
  form.append("email", email);

  axios
    .post(SERVER_URL + "/join/email", form)
    .then((res) => {
      //success
      setDuplicateEmail(false);
    })
    .catch((err) => {
      //console.log(err);
      setDuplicateEmail(true);
    });
};

export const PostCheckNickname = (props) => {
  const { nickname, setDuplicateNick } = props;

  const form = new FormData();
  form.append("nickname", nickname);

  console.log(nickname);

  axios
    .post(SERVER_URL + "/join/nickname", form)
    .then((res) => {
      //success
      console.log(res);
      setDuplicateNick(false);
    })
    .catch((err) => {
      //console.log(err);
      console.log(err);
      setDuplicateNick(true);
    });
};

export const PostRegister = (props) => {
  const { data, setResResult } = props;

  let testmap = new Map();

  testmap.set("서울특별시", "B10");
  testmap.set("부산광역시", "C10");
  testmap.set("대구광역시", "D10");
  testmap.set("인천광역시", "E10");
  testmap.set("광주광역시", "F10");
  testmap.set("대전광역시", "G10");
  testmap.set("울산광역시", "H10");
  testmap.set("세종특별자치시", "I10");
  testmap.set("경기도", "J10");
  testmap.set("강원도", "K10");
  testmap.set("충청북도", "M10");
  testmap.set("충청남도", "N10");
  testmap.set("전라북도", "P10");
  testmap.set("전라남도", "Q10");
  testmap.set("경상북도", "R10");
  testmap.set("경상남도", "S10");
  testmap.set("제주특별자치도", "T10");

  const json = JSON.stringify({
    username: data.username,
    nickname: data.nickname,
    password: data.password,
    email: data.email,
    educationCenter: testmap.get(data.educationcenter),
    schoolname: data.schoolname,
    grade: data.grade,
    classnum: data.classnum,
  });
  console.log(json);
  axios
    .post(SERVER_URL + "/join", json, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      //success
      console.log(res);

      setResResult(true);
      localStorage.setItem("TOKEN", `Bearer ${res.data}`);
      tokenData(localStorage.getItem("TOKEN"));
    })
    .catch((err) => {
      //console.log(err);
      setResResult(false);
    });
};

export const GetFriendList = async (props) => {
  const { setFriendList } = props;

  await axios
    .get(SERVER_URL + "/user/friends", {
      headers: {
        Authorization: tokenData(),
      },
    })
    .then((res) => {
      setFriendList(res);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetFriendFollowList = async (props) => {
  const { setFriendFollowList } = props;

  await axios
    .get(SERVER_URL + "/user/followers", {
      headers: {
        Authorization: tokenData(),
      },
    })
    .then((res) => {
      setFriendFollowList(res);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetDinnerList = async (props) => {
  const { setdinnerlist } = props;

  await axios
    .get("/api/hub/mealServiceDietInfo", {
      params: {
        KEY: "d42c851653dc4a008d9e831aaf3b8a31",
        Type: "json",
        ATPT_OFCDC_SC_CODE: "T10",
        SD_SCHUL_CODE: "9296071",
        pIndex: "1",
        pSize: "5",
      },
    })
    .then((res) => {
      setdinnerlist(res);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetTimeList = async (props) => {
  const { setschedule } = props;

  await axios
    .get("/api/hub/hisTimetable", {
      params: {
        KEY: "d42c851653dc4a008d9e831aaf3b8a31",
        Type: "json",
        AY: "2021", // 년도
        SEM: SEM, //학기
        ATPT_OFCDC_SC_CODE: "T10", // 교육청 코드
        SCHUL_NM: "원광고등학교", // 학교 이름
        GRADE: "3", //학년
        CLASS_NM: "2", //반
        pIndex: "1",
        pSize: "10",
      },
    })
    .then((res) => {
      setschedule(res);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetSchoolInfo = async (props) => {
  const { setreg, schoolname, educationcenter } = props;

  let testmap = new Map();

  testmap.set("서울특별시", "B10");
  testmap.set("부산광역시", "C10");
  testmap.set("대구광역시", "D10");
  testmap.set("인천광역시", "E10");
  testmap.set("광주광역시", "F10");
  testmap.set("대전광역시", "G10");
  testmap.set("울산광역시", "H10");
  testmap.set("세종특별자치시", "I10");
  testmap.set("경기도", "J10");
  testmap.set("강원도", "K10");
  testmap.set("충청북도", "M10");
  testmap.set("충청남도", "N10");
  testmap.set("전라북도", "P10");
  testmap.set("전라남도", "Q10");
  testmap.set("경상북도", "R10");
  testmap.set("경상남도", "S10");
  testmap.set("제주특별자치도", "T10");

  if (!testmap.get(educationcenter)) {
    setreg(false);
    return;
  } else {
    await axios
      .get("/api/hub/schoolInfo", {
        params: {
          KEY: "d42c851653dc4a008d9e831aaf3b8a31",
          Type: "json",
          pIndex: "1",
          pSize: "1000",
          ATPT_OFCDC_SC_CODE: testmap.get(educationcenter),
          SCHUL_NM: schoolname,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.schoolInfo[0].head[1].RESULT);
        setreg(true);
      })
      .catch((err) => {
        console.log(err);
        setreg(false);
      });
  }
};

export const GetConfirmEmail = async (props) => {
  const { tokenURL, setSuccess } = props;

  await axios
    .get(SERVER_URL + "/confirm-email", {
      params: {
        token: tokenURL,
      },
    })
    .then((res) => {
      console.log(res);
      setSuccess(true);
    })
    .catch((err) => {
      console.log(err);
      setSuccess(false);
    });
};
