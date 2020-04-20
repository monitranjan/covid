import React, { Component } from "react";
import {Navbar,Button,Form,Nav} from 'react-bootstrap'
export default class Navigationbar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand>Welcome {localStorage.getItem("user")}</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/registration">Registration</Nav.Link>
          </Nav>
          <Form inline>
            <Button variant="outline-light" href="/logout">
              Logout
            </Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}
