import axios from "axios";
import { tokenData } from "../Apollo";
import { SERVER_URL } from "./URL";

export const client = axios.create({
  headers: {
    Authorization: localStorage.getItem("TOKEN"),
  },
});

export const clientSet = (axios.defaults.headers.common["Authorization"] =
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

  const json = JSON.stringify({
    username: data.username,
    nickname: data.nickname,
    password: data.password,
    email: data.email,
    region: data.region,
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
  const { setDinnerList } = props;

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
      setDinnerList(res);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetSchoolInfo = async (props) => {
  await axios
    .get("/api/hub/schoolInfo", {
      params: {
        KEY: "d42c851653dc4a008d9e831aaf3b8a31",
        Type: "json",
        pIndex: "1",
        pSize: "100",
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
