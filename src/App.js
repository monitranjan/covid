import React from "react";
import "./App.css";
import SignIn from './component/SignIn';
import Dashboard from './component/Dashboard';
import Registration from './component/Registration';
import Login from './component/Login'
import DoctorDashboard from './component/DoctorDashboard';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Logout from "./component/Logout";
import PatientDashboard from "./component/PatientDashboard";
import PatientUpdate from "./component/PatientUpdate";
import ProtectedAdmin from "./component/Protected";
import ProtectedDoctor from './component/ProtectedDoctor';
function App() {
  return (
    <div>
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/SignIn" component={SignIn} />
      <ProtectedAdmin exact path="/dashboard" component={Dashboard} />
      <ProtectedAdmin exact path='/registration' component={Registration}/>
      <Route path='/Login' component={Login}/>
      <Route path='/logout' component={Logout}/>
      <ProtectedDoctor path="/doctordashboard" component={DoctorDashboard}  />
      <Route path="/patientdashboard" component={PatientDashboard}  />
      <ProtectedAdmin exact path="/patientupdate/:id" component={PatientUpdate} />
    </Router>
    </div>
  );
}

export default App;
