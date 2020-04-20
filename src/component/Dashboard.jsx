import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {Link } from 'react-router-dom';
import Navigationbar from './Navigationbar';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(5),
    minWidth: 700,
  },
}));
export default function Dashboard() {
  const classes = useStyles();
  const [lists, setList] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3333/patient`).then((response) => {
      response.json().then((result) => {
        setList(result);
        console.warn(result);
      });
    });
  }, []);

  return (
    <div>
     <Navigationbar />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>S.NO.</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">Doctor Assigned</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lists.map((list) => (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {list.id}
                </StyledTableCell>
                <StyledTableCell align="right">{list.name}</StyledTableCell>
                <StyledTableCell align="right">{list.gender}</StyledTableCell>
                <StyledTableCell align="right">{list.mobile}</StyledTableCell>
                <StyledTableCell align="right">{list.doctor}</StyledTableCell> 
                <StyledTableCell align="right">{list.status}</StyledTableCell>
                <StyledTableCell align="right">{list.address}</StyledTableCell>
                <StyledTableCell align="right"><Link to={"/patientupdate/"+list.id}>Edit</Link></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
