import React, { Component } from "react";
import { Tab,Tabs } from "react-bootstrap";
import SignIn from './SignIn';
import DoctorSignIn from './DoctorSignIn';
import PatientSignIn from './PatientSignIn';
export default class Login extends Component {
 constructor(){
super()
this.state={
  setuser: null,
}
 }
 componentDidMount(){
   localStorage.clear();
   sessionStorage.clear();
 }
  render() {
    return (
      <div>
        <Tabs justify defaultActiveKey="admin">
          <Tab eventKey="admin" title="Admin SignIn">
            <SignIn />
          </Tab>
          <Tab eventKey="doctor" title="Doctor SignIn">
           <DoctorSignIn />
          </Tab>
          <Tab eventKey="patient" title="Patient SignIn" >
          <PatientSignIn />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
