import moment from "moment";
import React from "react";

export default function ListJoCosIMP() {
  let data = JSON.parse(localStorage.getItem("forPrinting"));
  let TAvalue = "";
  let count = 0;
  data.forEach((el, ind) => {
    if (moment().isBefore(el.service_history[0].ep_end)) {
      TAvalue += `${count + 1},`;
      TAvalue += `"${el.name.split(", ")[0]}",`;
      TAvalue += `"${el.name.split(", ")[1]}",,`;
      TAvalue += `"${el.birthdate}",`;
      // TAvalue += `"${moment(el.birthdate).format("MM/DD/YY")}",`;
      TAvalue += `"${el.sex}",,`;
      TAvalue += `"${appStatus(el.service_history[0].appointment_status)}",`;
      TAvalue += `"${yearsInService(el.service_history[el.service_history.length - 1].ep_start, el.service_history[0].ep_end)}",`;
      TAvalue += `"${el.service_history[0].general_function}",`;
      TAvalue += `\n`;
      count += 1;
    }
  });

  return (
    <div>
      <ul>
        <li>
          Download the Template. <a href="/List-of-JO_COS_MOA_template.xlsx">Template</a>
        </li>
        <li>Copy data below.</li>
        <li>Open the template downloaded before</li>
        <li>Select all cells under "Birthdate" and change "Format Cell" to plain text</li>
        <li>Select cell A9 and paste what was copied</li>
        <li>Go to "Data" then "Text to Column"</li>
        <li>The data is delimeted by commas; select the appropriate checkboxes</li>
        <li>Then click Finish</li>
      </ul>
      <textarea cols={150}>{TAvalue}</textarea>
    </div>
  );
}

const yearsInService = (start, latest) => {
  return moment(latest).diff(start, "years");
  // return `${start} - ${latest}`;
};
const appStatus = (stat) => {
  if (!stat) return "";
  switch (stat) {
    case "Job Order":
      return "JO";
    case "Contractual":
      return "COS";
    default:
      break;
  }
};
