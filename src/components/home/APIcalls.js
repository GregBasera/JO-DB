import Axios from "axios";
import qs from "qs";
import { JOs, Departments, FundSources } from "../shared/endpoints";
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
  Axios.get(`${Departments}/count`, headers())
    .then((res) => {
      // callback(res.data);
      if (localStorage.getItem("offices") && JSON.parse(localStorage.getItem("offices")).length === res.data) {
        callback(JSON.parse(localStorage.getItem("offices")));
      } else {
        Axios.get(Departments, headers())
          .then((res) => {
            localStorage.setItem("offices", JSON.stringify(res.data));
            callback(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
  Axios.get(JOs, headers())
    .then((res) => {
      if (data[1] !== "all") {
        // we filter all personel only looking on thier lastest appointment
        callback(res.data.filter((person) => person.service_history[0][data[0]] === data[1]));
      } else {
        callback(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function addDept(data, callback) {
  Axios.post(Departments, data, headers())
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deletePersonel(id, callback) {
  Axios.delete(`${JOs}/${id}`, headers())
    .then((res) => {
      callback(res.data._id);
    })
    .catch((err) => {
      console.log(err);
    });
}

function pushNewAppoint(id, data, callback) {
  Axios.put(`${JOs}/${id}`, data, headers())
    .then((res) => {
      callback(id, data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function editExisting(id, data, callback) {
  Axios.put(`${JOs}/${id}`, data, headers())
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getFundSources(callback) {
  Axios.get(FundSources, headers())
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { initialize, getOffices, newPersonel, search, filter, addDept, deletePersonel, pushNewAppoint, editExisting, getFundSources };
