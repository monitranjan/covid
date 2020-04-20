import React, { Component } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Navbar,
  Form,
  Nav,
  Modal,
} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
export default class DoctorDashboard extends Component {
  constructor() {
    super();
    this.state = {
      patientList: [],
      show: false,
      newDoctor: "",
      newStatus: "",
      item: null,
    };
  }
  async componentDidMount() {
    const doctor = sessionStorage.getItem("user");
    let response = await fetch(
      "http://localhost:3333/patient?doctor=" + doctor
    );
    let result = await response.json();
    this.setState({ patientList: result });
    console.log(result);
  }

  handleClose = () =>
    this.setState({
      show: false,
    });
  handleShow = (id) => {
    this.setState({
      show: true,
      item: id,
      newDoctor: id.doctor,
      newStatus: id.status,
    });
  };

  handleSave(item) {
    item.doctor = this.state.newDoctor;
    item.status = this.state.newStatus;
    fetch(`http://localhost:3333/patient/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((res) => {
        alert("Doctor updated");
      });
    });
    // console.log(this.state.newDoctor);
    this.handleClose();
  }
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand>Welcome {sessionStorage.getItem("user")}</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/doctordashboard">Dashboard</Nav.Link>
          </Nav>
          <Form inline>
            <Button variant="outline-light" href="/logout">
              Logout
            </Button>
          </Form>
        </Navbar>
        <Container>
          <h1 className="text-center">Patient List</h1>
          {this.state.patientList.length != 0 ? (
            <Container>
              <Row xs={2} md={4}>
                {this.state.patientList.map((item) => (
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        <p>Address:{item.address}</p>
                        <p>Mobile:{item.mobile}</p>
                        <p>Gender:{item.gender}</p>
                        <p>Status:{item.status}</p>
                        <p>Doctor Assigned:{item.doctor}</p>
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => this.handleShow(item)}
                      >
                        Update information
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </Row>
            </Container>
          ) : (
            <div>No data found</div>
          )}
        </Container>
        <Modal show={this.state.show} onHide={this.handleClose}>
        <form
              onSubmit={() => {
                this.handleSave(this.state.item);
              }}
            >
          <Modal.Header closeButton>
            <Modal.Title>Update Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="status"
                value={this.state.newStatus}
                onChange={(e) => {
                  this.setState({ newStatus: e.target.value });
                }}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="New Doctor"
                value={this.state.newDoctor}
                onChange={(e) => {
                  this.setState({ newDoctor: e.target.value });
                }}
                autoFocus
              />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}
