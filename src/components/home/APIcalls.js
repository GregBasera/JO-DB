import Axios from "axios";
import { JOs } from "../shared/endpoints";
import headers from "../shared/headers";

function initialize(callback) {
  Axios.get(JOs, headers())
    .then((res) => {
      console.log(res);
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { initialize };
