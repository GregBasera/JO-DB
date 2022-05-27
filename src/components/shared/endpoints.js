// assumes that the database (strapi) is in the same IP/hostname as the app
var baseurl = `http://${window.location.hostname}:1337`;

const Auth = baseurl + "/auth/local";
const Register = baseurl + "/auth/local/register";
const JOs = baseurl + "/job-orders";
const FundSources = baseurl + "/funding-sources";
const Departments = baseurl + "/departments";

export { Auth, Register, JOs, Departments, FundSources };
