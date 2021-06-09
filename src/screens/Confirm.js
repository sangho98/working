import react, { useEffect, useState } from "react";

import { GetConfirmEmail } from "../utils/ApiConfig";

function Confirm(props) {
  const [success, setSuccess] = useState(false);
  const params = props.location.search.split("token=");

  GetConfirmEmail({ tokenURL: params[1], setSuccess: setSuccess });

  if (success) {
    return <div>인증 진행중</div>;
  } else {
    return <div>인증 실패!</div>;
  }
}

export default Confirm;
