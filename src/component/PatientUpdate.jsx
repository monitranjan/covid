import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Navigationbar from "./Navigationbar";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function PatientUpdate(props) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [doctor, setDoctor] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  useEffect(() => {
    let id = props.match.params.id;
    fetch(`http://localhost:3333/patient/${id}`).then((response) => {
      response.json().then((result) => {
        setName(result.name);
        setAddress(result.address);
        setMobile(result.mobile);
        setDoctor(result.doctor);
        setStatus(result.status);
        setGender(result.gender);
      });
    });

  }, []);

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let id = props.match.params.id;
    fetch(`http://localhost:3333/patient/${id}`, {
        method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, address, mobile, doctor,status, gender }),
    }).then((result) => {
      result.json().then((res) => {
        alert("Patient Updated Successfully");
      });
    });
  };

  return (
    <div>
      <Navigationbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Patient's Registration
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <TextField
              label="Address"
              value={address}
              multiline
              fullWidth
              required
              rows="2"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              label="Mobile Number"
              value={mobile}
              type="number"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setMobile(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              value={doctor}
              required
              fullWidth
              placeholder="Assign Doctor"
              onChange={(e) => setDoctor(e.target.value)}
            />
              <TextField
              variant="outlined"
              margin="normal"
              value={status}
              required
              fullWidth
              placeholder="status"
              onChange={(e) => setStatus(e.target.value)}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup value={gender} onChange={handleChange}>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onSubmit={handleSubmit}
            >
              Register
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
