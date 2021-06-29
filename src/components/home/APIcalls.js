import Axios from "axios";
import qs from "qs";
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

function newPersonel(data, callback) {
  Axios.post(JOs, data, headers())
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function search(searchTerm, callback) {
  // for personel name and sex; nothing else
  let query = qs.stringify({ _where: { _or: [{ name_contains: searchTerm }, { sex_contains: searchTerm }] } });

  Axios.get(`${JOs}?${query}`, headers())
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function filter(data, callback) {
  let query = qs.stringify({ _where: [{ service_history_in: [{ designation: "asd" }] }] });

  Axios.get(`${JOs}?${query}`, headers())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { initialize, getOffices, newPersonel, search, filter };
