import React, { Component } from "react";
import { Card, Button,Container,Navbar,Row,Form,Nav} from "react-bootstrap";
export default class DoctorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientList: null,
    };
  }
  componentDidMount() {
    const mobileNumber = localStorage.getItem("user");
    fetch("http://localhost:3333/patient?mobile=" + mobileNumber).then((response) => {
      response.json().then((result) => {
        this.setState({ patientList: result }) 
      });
    });
  }
  render() {
    return (
        <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand>Welcome {sessionStorage.getItem("patient")}</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/patientdashboard">Dashboard</Nav.Link>
          </Nav>
          <Form inline>
            <Button variant="outline-light" href="/logout">
              Logout
            </Button>
          </Form>
        </Navbar>
      <Container>
        <h1 className="text-center">Details</h1>
        {this.state.patientList ? (
          <Container>
              <Row xs={2} md={4}>
            {this.state.patientList.map((item) => (
              <Card style={{ width: "18rem",marginRight:"10px" }}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    <p>Address:{item.address}</p>
                    <p>Mobile:{item.mobile}</p>
                    <p>Gender:{item.gender}</p>
                    <p>Status:{item.status}</p>
                    <p>Doctor:{item.doctor}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
            </Row>
          </Container>
        ) : (
          <div>No data found</div>
        )}
      </Container>
      </div>
    );
  }
}
