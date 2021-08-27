// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import EmploymentCert from "./components/Reports/EmploymentCert";
import ServiceRecord from "./components/Reports/ServiceRecord";
import JOappreport from "./components/Reports/JOappreport";
import PersonalInfoReport from "./components/Reports/PersonalInfoReport";
import NotFound from "./components/shared/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={["/", "/auth"]} exact component={Auth} />
        <Route path="/home" exact component={Home} />
        <Route path="/employcert" exact component={EmploymentCert} />
        <Route path="/servrecord" exact component={ServiceRecord} />
        <Route path="/joappreport" exact component={JOappreport} />
        <Route path="/perinforeport" exact component={PersonalInfoReport} />
        {/* <Route path="/admin" exact component={Admin} /> */}
        <Route component={NotFound} /> {/* 404 */}
      </Switch>
    </Router>
  );
}

export default App;
