import Axios from "axios";
import qs from "qs";
import { JOs, Departments, FundSources } from "../shared/endpoints";
import headers from "../shared/headers";

export function initialize(sort, callback) {
  Axios.get(`${JOs}?_start=${0}&_limit=${9999}&_sort=name:${sort}`, headers())
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getOffices(callback) {
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

export function newPersonel(data, callback) {
  Axios.post(JOs, data, headers())
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function search(searchTerm, callback) {
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

export function filter(data, callback) {
  Axios.get(JOs, headers())
    .then((res) => {
      if (data[1] !== "all") {
        // we filter all personel only looking on thier latest appointment
        callback(res.data.filter((person) => person.service_history[0][data[0]] === data[1]));
      } else {
        callback(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function addDept(data, callback) {
  Axios.post(Departments, data, headers())
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function addFund(data, callback) {
  Axios.post(FundSources, data, headers())
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deletePersonel(id, callback) {
  Axios.delete(`${JOs}/${id}`, headers())
    .then((res) => {
      callback(res.data._id);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function pushNewAppoint(id, data, callback) {
  Axios.put(`${JOs}/${id}`, data, headers())
    .then((res) => {
      callback(id, data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function editExisting(id, data, callback) {
  Axios.put(`${JOs}/${id}`, data, headers())
    .then((res) => {
      callback(id, res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getFundSources(callback) {
  Axios.get(`${FundSources}/count`, headers())
    .then((res) => {
      // callback(res.data);
      if (localStorage.getItem("funding") && JSON.parse(localStorage.getItem("funding")).length === res.data) {
        callback(JSON.parse(localStorage.getItem("funding")));
      } else {
        Axios.get(FundSources, headers())
          .then((res) => {
            localStorage.setItem("funding", JSON.stringify(res.data));
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

export function onRecord(callback) {
  Axios.get(`${JOs}/count`, headers())
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// export { initialize, getOffices, newPersonel, search, filter, addDept, addFund, deletePersonel, pushNewAppoint, editExisting, getFundSources, onRecord };
