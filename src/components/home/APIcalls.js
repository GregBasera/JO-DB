import Axios from "axios";
import { JOs, Departments } from "../shared/endpoints";
import headers from "../shared/headers";

function initialize(callback) {
  Axios.get(JOs, headers())
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getOffices(callback) {
  Axios.get(Departments, headers())
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { initialize, getOffices };
